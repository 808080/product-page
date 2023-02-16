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

  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (user: User) => {
  try {
    const users = getUsers()!;
    const userIndex = users.findIndex((u) => u.id === user.id);
    users[userIndex] = user;
    rewriteJSON('users', users);
    return getUserById(user.id);
  } catch (err) {
    console.log(err);
  }
};

export const login = (email: User['email'], password: User['password']) => {
  try {
    const user = getUsers()?.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid e-mail or password');
    return user;
  } catch (err) {
    console.log(err);
  }
};