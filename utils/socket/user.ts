import { User } from 'types';

let users: User[] = [];

export const getUsers = () => users;

export const addUser = ({
  id,
  name,
  room,
}: {
  id: string;
  name: string;
  room: string;
}) => {
  const user = { id, name, room, selectedCard: null };
  users.push(user);

  return { user };
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
};

export const getUserById = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};

export const updateUser = (id: string, card: string) => {
  const index = users.findIndex((existingUser) => existingUser.id === id);
  if (index === -1) {
    return;
  }
  users[index].selectedCard = card;
  return users;
};

export const getUsersByRoom = (room: string) => {
  return users.filter((user) => user.room === room);
};

export const deleteEstimations = (room: string) => {
  const newUsers = users.map((user) => {
    if (user.room !== room) return user;
    user.selectedCard = null;
    return user;
  });

  users = newUsers;
};
