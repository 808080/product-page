import { Request } from 'express';

export type Lang = {
  en: 'en';
  ru?: 'ru';
};

export type LangUnion = keyof Lang;

export type IntlString = { [key in keyof Lang]: string };

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  birthDate: Date;
  phone: string;
  password: string;
};

export type UserDTO = Omit<User, 'id'>;
export type UserDAO = Omit<User, 'password'>;

export interface TypedRequestBody<T> extends Request {
  body: T
};

export type Product = {
  id: number;
  title: IntlString;
  description: IntlString;
  thumbnail: string;
};
