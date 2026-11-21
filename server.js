const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Хранилище сообщений (в памяти, при перезагрузке очистится)
let messages = [];

// Раздача статики (наш index.html)
app.use(express.static(path.join(__dirname)));

// Эндпоинт для UptimeRobot (чтобы сервер не спал)
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Отправляем клиенту историю последних 50 сообщений
  ws.send(JSON.stringify({ type: 'history', data: messages.slice(-50) }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'message') {
        const msgObj = {
          id: Date.now(),
          text: data.text,
          user: data.user || 'Аноним',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        messages.push(msgObj);
        if (messages.length > 100) messages.shift(); // Храним только последние 100
        
        // Рассылаем всем
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'newMessage', data: msgObj }));
          }
        });
      }
    } catch (e) {
      console.error('Error parsing message:', e);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`MONO Server is running on port ${PORT}`);
});
