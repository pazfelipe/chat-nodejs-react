import socket from '../libs/socketio';
import { getSessionIdFromLocalStorage } from './socketio';
export const onHandleChat = (message: string) => {
  const chat = {
    session: getSessionIdFromLocalStorage(),
    message,
    timestamp: new Date().getTime()
  };

  socket.emit('on chat', chat);
};