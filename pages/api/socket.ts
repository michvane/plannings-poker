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
  if (!name || !room) return { error: "name and room required." };
  const user = { id, name, room, selectedCard: null };
  users.push(user);

  return { user };
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};

const updateUser = (user: User, card: number) => {
  console.log(users, "user:", user, card);
  const index = users.findIndex((existingUser) => existingUser.id === user.id);
  if (index === -1) {
    console.log("no user found");
    return;
  }
  users[index].selectedCard = card;
  return users;
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
      // Card change

      // Join room
      socket.on("join", ({ name, room }) => {
        console.log("user joined", name, room);
        const { user, error } = addUser({ id: socket.id, name, room });

        if (!user) return;
        if (error) return console.log(error);

        socket.emit("message", {
          user: "Admin",
          text: `Welcome to ${user.room}`,
        });

        socket.emit("users", users);

        socket.broadcast.to(user.room).emit("message", {
          user: user.name,
          text: `${user.name} has joined!`,
        });

        socket.join(user.room as string);

        socket.on("card-change", (card: number) => {
          const newUsers = updateUser(user, card);
          socket.broadcast.emit("update-cards", newUsers);
        });
      });

      // TODO: Test Disconnect
      socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} just left the room`,
        });
      });
    });
  }

  res.end();
};

export default SocketHandler;
