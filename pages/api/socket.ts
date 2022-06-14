import socketEvents from "constants/events";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { User } from "../../types";

type Socket = NextApiResponse["socket"] & { server: { io: Server } };
interface Data extends NextApiResponse {
  socket: Socket;
}

let users: User[] = [];

//TODO: Update users

const addUser = ({
  id,
  name,
  room,
}: {
  id: string;
  name: string;
  room: string;
}) => {
  // if (!name || !room) return { error: "name and room required." };
  const user = { id, name, room, selectedCard: null };
  users.push(user);

  return { user };
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
};

const getUserById = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};

const updateUser = (id: string, card: number) => {
  const index = users.findIndex((existingUser) => existingUser.id === id);
  if (index === -1) {
    console.log("no user found");
    return;
  }
  users[index].selectedCard = card;
  return users;
};

const getUsersByRoom = (room: string) => {
  return users.filter((user) => user.room === room);
};

const deleteEstimations = (room: string) => {
  const newUsers = users.map((user) => {
    if (user.room !== room) return user;
    user.selectedCard = null;
    return user;
  });

  users = newUsers;
};

const SocketHandler = (req: NextApiRequest, res: Data) => {
  if (res?.socket?.server?.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    //@ts-ignore
    const io = new Server(res?.socket?.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // Join room
      socket.on("join", ({ name, room }) => {
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

      socket.on(socketEvents.updateCard, (card: number) => {
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

      // TODO: Test Disconnect
      socket.on("disconnect", () => {
        const user = getUserById(socket.id);
        if (!user) return;

        removeUser(socket.id);
        io.to(user.room).emit(socketEvents.disconnect, users);
      });
    });
  }

  res.end();
};

export default SocketHandler;
