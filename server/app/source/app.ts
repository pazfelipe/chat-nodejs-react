import express, { Request, Response } from 'express';
import { Server as ServerIo } from 'socket.io';
import http from 'http';
import cors from 'cors';
import redis from './databases/redis';

const app = express();
app.use(cors);

const server = http.createServer(app);
const io = new ServerIo(server, {
  cors: {
    origin: '*',
  }
});


io.on('connection', socket => {
  socket.join('room1');
  socket.emit('on connected', { message: 'connected', session: socket.id });
  console.log(socket.id);

  socket.on('on loaded', data => {
    redis.set(`user_${data.id}`, socket.id);
    socket.emit('on connected', { message: 'saved', session: socket.id });
  });

  socket.on('on chat', chat => {
    console.log('message received', chat);
    io.to('room1').emit('message received', {
      user: chat.session.id,
      message: chat.message,
      timesmap: chat.timestamp
    });
  });
});

export default server;

