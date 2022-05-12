import { onHandleSocketIoConnection, onLoadedPage } from './../services/socketio';
import { io } from 'socket.io-client';
import { BACKEND_HOST } from '../configs';

const socket = io(`http://${BACKEND_HOST}`, {
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

onHandleSocketIoConnection(socket);
onLoadedPage(socket);
export default socket;