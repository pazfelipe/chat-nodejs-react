import { Socket } from 'socket.io-client';

type DATA_CONNECTED = {
  message: string;
  id: string;
  session: string;
};

type SESSION_DATA = {
  session_id: string;
  id: string;
};

const saveIdSessionOnLocalStorage = (session: SESSION_DATA) => {
  localStorage.setItem('session', JSON.stringify({ session: session.session_id, id: session.id }));
};

const generateActiveUserID = () => {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return id;
};

export const getSessionIdFromLocalStorage = (): SESSION_DATA | {} => {
  return JSON.parse(localStorage.getItem('session') || '{}');
};

export const onHandleSocketIoConnection = (socket: Socket) => {
  socket.on('on connected', ({ message, session }:
    DATA_CONNECTED) => {
    
      console.warn(message);
    
    const id = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session') as string).id : generateActiveUserID();

    saveIdSessionOnLocalStorage({ session_id: session, id });
  });
};

export const onLoadedPage = (socket: Socket) => {
  socket.emit('on loaded', getSessionIdFromLocalStorage());
};