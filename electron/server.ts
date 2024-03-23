import * as http from 'http';
import * as cors from 'cors'; 
import * as express from 'express';
import { Server as SocketIOServer } from 'socket.io';

const server = express();
const httpServer = http.createServer(server); // Create an HTTP server

const io = new SocketIOServer(httpServer); // Create a socket.io server instance


// ...rest of your code...

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);

  socket.on('send_message', data => {
    // Handle received message from client
    console.log(`Received message: ${data}`);

    // Send response back to the client
    const responseData = 'Response from server';
    socket.emit('receive_message', responseData);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
server.get('/api/data', (req, res) => {
  // Create or fetch the data you want to send to the frontend
  const data = {
    message: 'Hello, World!',
    value: 42
  };

  // Send the data as a JSON response
  res.json(data);
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