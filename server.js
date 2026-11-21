const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)));

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = new Map();
const usernames = new Map();
const rooms = new Map();
const messages = new Map();

const MAX_AVATAR_LENGTH = 1_500_000;
const MAX_MESSAGE_LENGTH = 2000;

rooms.set('global', {
  id: 'global',
  type: 'global',
  title: 'MONO Global',
  avatar: '',
  memberIds: new Set(),
  createdAt: Date.now(),
  updatedAt: 0
});

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
}

function send(ws, type, payload = {}) {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  try {
    ws.send(JSON.stringify({ type, ...payload }));
  } catch (e) {
    console.error('Send error:', e);
  }
}

function broadcast(type, payload = {}) {
  wss.clients.forEach(ws => send(ws, type, payload));
}

function getSubs(ws) {
  if (!ws._subs) ws._subs = new Set();
  return ws._subs;
}

function subscribe(ws, roomId) {
  getSubs(ws).add(roomId);
}

function subscribeUserToRooms(ws, userId) {
  subscribe(ws, 'global');

  rooms.forEach(room => {
    if (room.id !== 'global' && room.memberIds.has(userId)) {
      subscribe(ws, room.id);
    }
  });
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    avatar: user.avatar || '',
    online: user.sockets.size > 0,
    lastSeen: user.lastSeen
  };
}

function allPublicUsers() {
  return Array.from(users.values()).map(publicUser);
}

function getRoomMessages(roomId) {
  return messages.get(roomId) || [];
}

function publicRoom(room, userId) {
  const roomMessages = getRoomMessages(room.id);

  return {
    id: room.id,
    type: room.type,
    title: room.title,
    avatar: room.avatar || '',
    memberIds: Array.from(room.memberIds),
    lastMessage: roomMessages.length ? roomMessages[roomMessages.length - 1] : null,
    updatedAt: room.updatedAt || 0,
    createdBy: room.createdBy || null
  };
}

function getUserRooms(userId) {
  const list = [];

  const globalRoom = rooms.get('global');
  if (globalRoom) list.push(publicRoom(globalRoom, userId));

  rooms.forEach(room => {
    if (room.id !== 'global' && room.memberIds.has(userId)) {
      list.push(publicRoom(room, userId));
    }
  });

  list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  return list;
}

function sendToUser(userId, type, payload = {}) {
  const user = users.get(userId);
  if (!user) return;
  user.sockets.forEach(ws => send(ws, type, payload));
}

function sendToRoom(roomId, type, payload = {}) {
  wss.clients.forEach(ws => {
    if (ws._subs && ws._subs.has(roomId)) {
      send(ws, type, payload);
    }
  });
}

function touchRoom(roomId) {
  const room = rooms.get(roomId);
  if (room) room.updatedAt = Date.now();
}

function addMessage(roomId, message) {
  let roomMessages = messages.get(roomId);

  if (!roomMessages) {
    roomMessages = [];
    messages.set(roomId, roomMessages);
  }

  roomMessages.push(message);

  if (roomMessages.length > 100) {
    roomMessages.shift();
  }

  touchRoom(roomId);
}

function ensurePrivateRoom(userAId, userBId) {
  const sorted = [userAId, userBId].sort();
  const roomId = `private_${sorted[0]}_${sorted[1]}`;

  let room = rooms.get(roomId);

  if (!room) {
    room = {
      id: roomId,
      type: 'private',
      title: '',
      avatar: '',
      memberIds: new Set(sorted),
      createdAt: Date.now(),
      updatedAt: 0,
      createdBy: userAId
    };

    rooms.set(roomId, room);
  }

  return room;
}

function notifyRoomMembers(room, type = 'roomAdded') {
  room.memberIds.forEach(userId => {
    sendToUser(userId, type, {
      room: publicRoom(room, userId)
    });
  });
}

function subscribeRoomMembers(room) {
  room.memberIds.forEach(userId => {
    const user = users.get(userId);
    if (!user) return;

    user.sockets.forEach(ws => {
      subscribe(ws, room.id);
    });
  });
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{3,24}$/.test(username);
}

wss.on('connection', ws => {
  ws.isAlive = true;
  ws._subs = new Set();
  ws.userId = null;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', raw => {
    let data;

    try {
      data = JSON.parse(raw);
    } catch (e) {
      return;
    }

    // Регистрация
    if (data.type === 'auth') {
      const username = String(data.username || '')
        .trim()
        .replace(/^@/, '');

      const displayName = String(data.displayName || username).trim().slice(0, 32);
      const avatar = typeof data.avatar === 'string' ? data.avatar : '';

      if (!isValidUsername(username)) {
        return send(ws, 'authError', {
          reason: 'invalid_username',
          message: 'Ник должен содержать 3–24 символа: буквы, цифры, _'
        });
      }

      if (!displayName) {
        return send(ws, 'authError', {
          reason: 'invalid_display_name',
          message: 'Введите отображаемое имя'
        });
      }

      if (avatar.length > MAX_AVATAR_LENGTH) {
        return send(ws, 'authError', {
          reason: 'avatar_too_large',
          message: 'Аватар слишком большой'
        });
      }

      const lowerUsername = username.toLowerCase();

      if (usernames.has(lowerUsername)) {
        return send(ws, 'authError', {
          reason: 'username_taken',
          message: 'Этот ник уже занят'
        });
      }

      const userId = makeId('user');

      const user = {
        id: userId,
        username,
        displayName,
        avatar,
        sockets: new Set([ws]),
        lastSeen: Date.now(),
        createdAt: Date.now()
      };

      users.set(userId, user);
      usernames.set(lowerUsername, userId);

      ws.userId = userId;
      subscribeUserToRooms(ws, userId);

      send(ws, 'authSuccess', {
        me: publicUser(user),
        users: allPublicUsers(),
        rooms: getUserRooms(userId)
      });

      broadcast('users', {
        users: allPublicUsers()
      });

      return;
    }

    // Восстановление сессии
    if (data.type === 'resume') {
      const userId = String(data.userId || '');
      const user = users.get(userId);

      if (!user) {
        return send(ws, 'authError', {
          reason: 'resume_failed',
          message: 'Сессия истекла. Войдите заново.'
        });
      }

      ws.userId = userId;
      user.sockets.add(ws);
      user.lastSeen = Date.now();

      subscribeUserToRooms(ws, userId);

      send(ws, 'authSuccess', {
        me: publicUser(user),
        users: allPublicUsers(),
        rooms: getUserRooms(userId)
      });

      broadcast('users', {
        users: allPublicUsers()
      });

      return;
    }

    // Дальше только для авторизованных
    if (!ws.userId) return;

    // Открыть комнату
    if (data.type === 'openRoom') {
      const roomId = String(data.roomId || 'global');
      const room = rooms.get(roomId);

      if (!room) {
        return send(ws, 'error', { message: 'Комната не найдена' });
      }

      if (roomId !== 'global' && !room.memberIds.has(ws.userId)) {
        return send(ws, 'error', { message: 'Нет доступа к комнате' });
      }

      subscribe(ws, roomId);

      send(ws, 'roomOpen', {
        room: publicRoom(room, ws.userId),
        messages: getRoomMessages(roomId)
      });

      return;
    }

    // Создать личный чат
    if (data.type === 'createPrivate') {
      const targetUserId = String(data.targetUserId || '');

      if (!targetUserId || targetUserId === ws.userId) return;
      if (!users.has(targetUserId)) return;

      const room = ensurePrivateRoom(ws.userId, targetUserId);
      subscribeRoomMembers(room);
      notifyRoomMembers(room);

      sendToUser(ws.userId, 'roomOpen', {
        room: publicRoom(room, ws.userId),
        messages: getRoomMessages(room.id)
      });

      return;
    }

    // Создать группу
    if (data.type === 'createGroup') {
      const name = String(data.name || '').trim().slice(0, 60);
      const avatar = typeof data.avatar === 'string' ? data.avatar : '';
      const memberIds = Array.isArray(data.memberIds)
        ? data.memberIds.filter(id => users.has(id) && id !== ws.userId)
        : [];

      if (!name) {
        return send(ws, 'error', { message: 'Название группы обязательно' });
      }

      if (avatar.length > MAX_AVATAR_LENGTH) {
        return send(ws, 'error', { message: 'Аватар группы слишком большой' });
      }

      const roomId = makeId('group');

      const room = {
        id: roomId,
        type: 'group',
        title: name,
        avatar,
        memberIds: new Set([ws.userId, ...memberIds]),
        createdAt: Date.now(),
        updatedAt: 0,
        createdBy: ws.userId
      };

      rooms.set(roomId, room);
      subscribeRoomMembers(room);
      notifyRoomMembers(room);

      sendToUser(ws.userId, 'roomOpen', {
        room: publicRoom(room, ws.userId),
        messages: []
      });

      return;
    }

    // Отправить сообщение
    if (data.type === 'message') {
      const roomId = String(data.roomId || 'global');
      const text = String(data.text || '').trim().slice(0, MAX_MESSAGE_LENGTH);

      if (!text) return;

      const room = rooms.get(roomId);

      if (!room) return;

      if (roomId !== 'global' && !room.memberIds.has(ws.userId)) {
        return send(ws, 'error', { message: 'Нет доступа к комнате' });
      }

      subscribe(ws, roomId);

      const sender = users.get(ws.userId);

      const message = {
        id: makeId('msg'),
        roomId,
        senderId: ws.userId,
        senderName: sender ? sender.displayName : 'Аноним',
        text,
        time: Date.now()
      };

      addMessage(roomId, message);

      sendToRoom(roomId, 'newMessage', {
        message
      });

      return;
    }

    // Поиск пользователей
    if (data.type === 'search') {
      const query = String(data.query || '').trim().toLowerCase();

      if (!query) {
        return send(ws, 'searchResults', {
          query: '',
          users: []
        });
      }

      const results = Array.from(users.values())
        .filter(user => {
          const hay = `${user.username} ${user.displayName}`.toLowerCase();
          return hay.includes(query);
        })
        .slice(0, 20)
        .map(publicUser);

      send(ws, 'searchResults', {
        query,
        users: results
      });

      return;
    }

    // Индикатор набора текста
    if (data.type === 'typing') {
      const roomId = String(data.roomId || 'global');
      const room = rooms.get(roomId);

      if (!room) return;
      if (roomId !== 'global' && !room.memberIds.has(ws.userId)) return;

      const sender = users.get(ws.userId);

      sendToRoom(roomId, 'typing', {
        roomId,
        userId: ws.userId,
        displayName: sender ? sender.displayName : 'Кто-то'
      });

      return;
    }
  });

  ws.on('close', () => {
    const userId = ws.userId;

    if (userId) {
      const user = users.get(userId);

      if (user) {
        user.sockets.delete(ws);
        user.lastSeen = Date.now();
        broadcast('users', {
          users: allPublicUsers()
        });
      }
    }
  });
});

// Heartbeat, чтобы WebSocket не умирал молча
setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

server.listen(PORT, () => {
  console.log(`MONO Messenger running on port ${PORT}`);
});
