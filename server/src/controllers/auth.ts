import { Router } from 'express';

export const authRouterFactory = () =>
  Router()
    .post('/login', (req, res, next) => {
      res.send('login');
    })

    .post('/logout', (req, res, next) => {
      res.send('logout');
    });