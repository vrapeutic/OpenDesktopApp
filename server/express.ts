import {
  REPORT_FILE_SAVE_PATH,
  SERVER_LOGS_COLOR,
  SOCKET_ALLOWED_EVENTS,
  START_APP_MESSAGE,
  YELLOW_SERVER_LOGS_COLOR,
} from '../electron/constants';
//server affairs
import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
// file affairs
import * as path from 'node:path';
import * as fs from 'fs';
import * as os from 'os';
const socketsIds: { [key: string]: string } = {};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(SERVER_LOGS_COLOR, 'a client connected');
  socketsIds[socket?.handshake?.query?.deviceId as string] = socket.id;

  socket.onAny((eventName, ...args) => {
    const event =
      SOCKET_ALLOWED_EVENTS[eventName as keyof typeof SOCKET_ALLOWED_EVENTS];

    if (!event) throw new Error('invalid event name: ' + eventName);

    const eventCustomHandler =
      CUSTOM_MESSAGE_HANDLERS[event as keyof typeof CUSTOM_MESSAGE_HANDLERS];

    console.log(
      SERVER_LOGS_COLOR,
      `received event: ${event} with args: ${JSON.stringify(args, null, 4)} ${
        eventCustomHandler !== undefined ? 'with custom handler' : ''
      }`
    );

    if (eventCustomHandler) {
      socket.on(event, eventCustomHandler);
      return;
    }

    // broadcast to all clients
    io.emit(event, args);
  });
});

const handlePlayModuleMessage = (args: any) => {
  const playModuleEvent =
    SOCKET_ALLOWED_EVENTS[
      START_APP_MESSAGE as keyof typeof SOCKET_ALLOWED_EVENTS
    ];

  const { clientDeviceId, ...rest } = args;

  console.log(YELLOW_SERVER_LOGS_COLOR, 'revcived start app message', args);

  const clientSocketId = socketsIds[clientDeviceId];

  if (clientSocketId) {
    io.to(clientSocketId).emit(playModuleEvent, rest);
  } else {
    io.emit(playModuleEvent, args);
  }
};

const handleReceivingReportMessage = (file: any, data: any) => {
  const { fileName } = data;
  const reportsDirUrl = getOrCreateReportDir();

  console.log(YELLOW_SERVER_LOGS_COLOR, `generate report at ${reportsDirUrl}`);

  fs.writeFile(
    `${reportsDirUrl}/${fileName || `${Date.now()}.csv`}`,
    file,
    (err) => {
      if (err) console.log(YELLOW_SERVER_LOGS_COLOR, err);
    }
  );
};

const getOrCreateReportDir = () => {
  const homeDir = os.homedir();
  const dirUrl = path.join(homeDir, REPORT_FILE_SAVE_PATH);

  if (!fs.existsSync(dirUrl)) {
    fs.mkdirSync(dirUrl, { recursive: true });
  }
  return dirUrl;
};

const CUSTOM_MESSAGE_HANDLERS = {
  playModule: handlePlayModuleMessage,
  generateSessionReport: handleReceivingReportMessage,
};

export default server;
