import {
  GENERATE_SESSION_REPORT,
  OUTGOING_ONLY_MESSAGES,
  REPORT_FILE_SAVE_PATH,
  SERVER_LOGS_COLOR,
  SOCKET_ALLOWED_EVENTS,
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

  socket.on(GENERATE_SESSION_REPORT, (file, fileName) => {
    const reportsDirUrl = getOrCreateReportDir();

    console.log(
      YELLOW_SERVER_LOGS_COLOR,
      `generate report at ${reportsDirUrl}`
    );

    fs.writeFile(
      `${reportsDirUrl}/${fileName || Date.now()}.csv`,
      file,
      (err) => {
        if (err) console.log(YELLOW_SERVER_LOGS_COLOR, err);
      }
    );
  });

  socket.onAny((eventName, ...args) => {
    const event =
      SOCKET_ALLOWED_EVENTS[eventName as keyof typeof SOCKET_ALLOWED_EVENTS];
    if (!event) throw new Error('invalid event name: ' + eventName);

    if (
      OUTGOING_ONLY_MESSAGES[eventName as keyof typeof OUTGOING_ONLY_MESSAGES]
    )
      return;

    console.log(
      SERVER_LOGS_COLOR,
      `received event: ${event} with args: ${JSON.stringify(args, null, 4)}`
    );
    // broadcast to all clients
    io.emit(event, args);
  });
});

const getOrCreateReportDir = () => {
  const homeDir = os.homedir();
  const dirUrl = path.join(homeDir, REPORT_FILE_SAVE_PATH);

  if (!fs.existsSync(dirUrl)) {
    fs.mkdirSync(dirUrl, { recursive: true });
  }
  return dirUrl;
};

export default server;
