import socketEvents from 'constants/events';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import {
  addUser,
  deleteEstimations,
  getUserById,
  getUsers,
  getUsersByRoom,
  removeUser,
  updateUser,
} from 'utils/socket/user';

type Socket = NextApiResponse['socket'] & { server: { io: Server } };
interface Data extends NextApiResponse {
  socket: Socket;
}

const SocketHandler = (_req: NextApiRequest, res: Data) => {
  if (res?.socket?.server?.io) {
    console.log('Socket is already running');
    return res.end();
  }

  console.log('Socket is initializing');

  //@ts-ignore
  const io = new Server(res?.socket?.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
      const { user } = addUser({ id: socket.id, name, room });

      if (!user) return;

      socket.join(user.room as string);

      socket.emit(socketEvents.setMessage, {
        message: `Welcome to room ${user.room}`,
      });

      socket.emit(socketEvents.setUsers, getUsersByRoom(room));

      socket.broadcast.to(user.room).emit(socketEvents.setMessage, {
        message: `${user.name} has joined!`,
      });

      socket.broadcast.to(user.room).emit(socketEvents.addUser, user);
    });

    socket.on(socketEvents.updateCard, (card: string) => {
      updateUser(socket.id, card);
      const currentUser = getUserById(socket.id);
      const usersByRoom = getUsersByRoom(currentUser.room);
      io.to(currentUser.room).emit(socketEvents.updateCard, usersByRoom);
    });

    socket.on(socketEvents.showCards, () => {
      const room = getUserById(socket.id).room;
      io.to(room).emit(socketEvents.showCards);
    });

    socket.on(socketEvents.deleteEstimations, () => {
      const room = getUserById(socket.id).room;
      deleteEstimations(room);
      const users = getUsersByRoom(room);
      io.to(room).emit(socketEvents.deleteEstimations, users);
    });

    socket.on('disconnect', () => {
      const user = getUserById(socket.id);
      if (!user) return;

      removeUser(socket.id);
      io.to(user.room).emit(socketEvents.disconnect, getUsers());
    });
  });

  res.end();
};

export default SocketHandler;
