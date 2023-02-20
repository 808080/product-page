import crypto from 'crypto';
import { readJSON, rewriteJSON } from './json';
import { User, UserDAO, UserDTO } from './types';

export const getUsers = () => readJSON<Array<User>>('users');

export const getUserById = (id: User['id']): UserDAO => {
  const user = getUsers()?.find((u) => u.id === id);
  if (!user) throw new Error('User not found');
  const { password, ...foundUser } = user;
  return foundUser;
};

export const createUser = (user: UserDTO) => {
  const users = getUsers() || [];

  if (users.some(u => u.email === user.email)) {
    throw new Error('This email is already taken');
  }

  const newUser = {
    ...user,
    id: crypto.randomUUID()
  };

  users.push(newUser);
  rewriteJSON('users', users);

  return getUserById(newUser.id);
};

export const updateUser = (user: UserDAO) => {
  const users = getUsers()!;
  const userIndex = users.findIndex((u) => u.id === user.id);
  users[userIndex] = { ...users[userIndex], ...user };
  rewriteJSON('users', users);
  return getUserById(user.id);
};

export const login = (email: User['email'], pass: User['password']) => {
  const user = getUsers()?.find((u) => u.email === email && u.password === pass);
  if (!user) throw new Error('Invalid e-mail or password');
  const { password, ...foundUser } = user;
  return foundUser;
};