import {
  SERVER_LOGS_COLOR,
  SOCKET_ALLOWED_EVENTS,
} from '../electron/constants';
import * as  express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

import { json } from 'body-parser';
import { ipcMain } from 'electron';

app.use(json());

// routes
app.post('/start-app', (req, res) => {
  const message = req.body.message;

  console.log(SERVER_LOGS_COLOR, 'received message: ' + message);
  ipcMain.emit('start-app', { event: 'start-app', message: message });

  res.send('express received message: ' + message);
});

io.on('connection', (socket) => {
  console.log(SERVER_LOGS_COLOR, 'a client connected');

  socket.onAny((eventName, ...args) => {
    if (!SOCKET_ALLOWED_EVENTS[eventName as keyof typeof SOCKET_ALLOWED_EVENTS])
      throw new Error('invalid event name: ' + eventName);

    console.log(
      SERVER_LOGS_COLOR,
      `received event: ${eventName} with args: ${JSON.stringify(args, null, 4)}`
    );
    // broadcast to all clients
    io.emit(eventName, args);
  });
});

export default server;