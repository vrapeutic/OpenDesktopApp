import * as http from 'http';


import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'socket.io';


const server = express();
const httpServer = http.createServer(server); // Create an HTTP server

const io = new Server(httpServer, {
  cors: {
    origin: "http://192.168.1.2:3000",
    methods: ["GET", "POST"]
  }
});

server.use(cors({
  origin: 'http://192.168.1.2:3000',
}));

server.get('/api/data', (req, res) => {
  // Create or fetch the data you want to send to the frontend
  const data = {
    message: 'Hello, World!',
    value: 42
  };

  // Send the data as a JSON response
  res.json(data);
});




server.get('/', (req, res) => {
  res.send('WebSocket server is running');
 
});


io.on('connection', function(socket) {
  console.log('connected socket!');

  socket.on('greet', function(data) {
    console.log(data);
    socket.emit('respond', { hello: 'Hey, Mr.Client!' });
  });
  socket.on('disconnect', function() {
    console.log('Socket disconnected');
  });
});
// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Handle server close
server.on('close', () => {
  console.log('Server closed');
});
export default server;