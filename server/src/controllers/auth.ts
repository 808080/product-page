import { Router } from 'express';
import { TypedRequestBody, User } from '../utils/types';
import { getUserById, login } from '../utils/user';

export const authRouterFactory = () =>
  Router()
    .post('/login', (req: TypedRequestBody<Pick<User, 'email' | 'password'>>, res, next) => {
      try {
        return res.status(200).json({ success: true, data: login(req.body.email, req.body.password) });
      } catch (error) {
        if (error instanceof Error) error = error.message;
        return res.status(404).json({ success: false, error });
      }
    })

    .post('/logout', (req: TypedRequestBody<Pick<User, 'id'>>, res, next) => {
      try {
        const user = getUserById(req.body.id);
        if (!user) throw new Error('User not found');
        return res.status(200).json({ success: true, data: null });
      } catch (error) {
        if (error instanceof Error) error = error.message;
        return res.status(404).json({ success: false, error });
      }
    });