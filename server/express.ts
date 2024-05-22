import {
  SERVER_LOGS_COLOR,
  SOCKET_ALLOWED_EVENTS,
} from '../electron/constants';
import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { writeFile } from 'fs';

const app = express();
const server = createServer(app);
const io = new Server(server, {
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

  socket.on('generateCsv', (file, callback) => {
    console.log(file);
    writeFile('../src/public/csvs/received_data.csv', file, (err) => {
      callback({ message: err ? 'failure' : 'success' });
    });
  });

  socket.onAny((eventName, ...args) => {
    const event =
      SOCKET_ALLOWED_EVENTS[eventName as keyof typeof SOCKET_ALLOWED_EVENTS];
    if (!event) throw new Error('invalid event name: ' + eventName);

    console.log(
      SERVER_LOGS_COLOR,
      `received event: ${event} with args: ${JSON.stringify(args, null, 4)}`
    );
    // broadcast to all clients
    io.emit(event, args);
  });
});

export default server;
