import { Router } from 'express';

export const userRouterFactory = () =>
  Router()
    .get('/user/:id', (req, res, next) => {
      res.send('user get');
    })

    .post('/user', (req, res, next) => {
      res.send('user post');
    });