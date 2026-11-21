const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Хранилище данных (в памяти)
const users = new Map(); // id -> { name, avatar, socketId }
const rooms = new Map(); // roomId -> [message, message...]

app.use(express.static(path.join(__dirname)));
app.use(express.json({ limit: '50mb' })); // Для загрузки аватарок

// Эндпоинт для UptimeRobot
app.get('/ping', (req, res) => res.status(200).send('pong'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // 1. Регистрация / Вход
      if (data.type === 'join') {
        const userId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
        users.set(userId, { 
          id: userId, 
          name: data.name, 
          avatar: data.avatar, 
          socketId: ws 
        });
        
        // Отправляем пользователю его ID и список всех юзеров
        ws.send(JSON.stringify({ 
          type: 'welcome', 
          userId: userId, 
          users: Array.from(users.values()).map(u => ({ id: u.id, name: u.name, avatar: u.avatar })) 
        }));

        // Оповещаем остальных о новом юзере
        broadcast({ type: 'userJoined', user: { id: userId, name: data.name, avatar: data.avatar } }, ws);
      }

      // 2. Сообщение (в комнату)
      if (data.type === 'message') {
        const roomId = data.roomId || 'global';
        if (!rooms.has(roomId)) rooms.set(roomId, []);
        
        const msgObj = {
          id: Date.now(),
          text: data.text,
          senderId: data.senderId,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const roomMessages = rooms.get(roomId);
        roomMessages.push(msgObj);
        if (roomMessages.length > 50) roomMessages.shift();

        // Отправляем всем, кто в этой комнате (или всем, если глобал)
        broadcastToRoom(roomId, { type: 'newMessage', data: msgObj });
      }

    } catch (e) { console.error(e); }
  });

  ws.on('close', () => {
    // Удаляем юзера из списка при выходе
    for (let [id, user] of users.entries()) {
      if (user.socketId === ws) {
        users.delete(id);
        broadcast({ type: 'userLeft', userId: id });
        break;
      }
    }
  });
});

function broadcast(data, excludeWs = null) {
  wss.clients.forEach((client) => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function broadcastToRoom(roomId, data) {
  // В простой версии отправляем всем, а клиент сам фильтрует по roomId
  // В сложной версии нужно мапить ws -> roomId
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Heartbeat чтобы соединение не рвалось
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

server.listen(PORT, () => console.log(`MONO Core running on ${PORT}`));
