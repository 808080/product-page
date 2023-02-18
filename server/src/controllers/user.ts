import { Router } from 'express';
import { TypedRequestBody, User, UserDTO } from '../utils/types';
import { createUser, getUserById, updateUser } from '../utils/user';

export const userRouterFactory = () =>
  Router()
    .get('/user/:id', (req, res, next) => {
      try {
        return res.status(200).json({ success: true, data: getUserById(req.params.id) });
      } catch (error) {
        if (error instanceof Error) error = error.message;
        return res.status(404).json({ success: false, error });
      }
    })

    .post('/user', (req: TypedRequestBody<UserDTO>, res, next) => {
      try {
        return res.status(200).json({ success: true, data: createUser(req.body) });
      } catch (error) {
        if (error instanceof Error) error = error.message;
        return res.status(500).json({ success: false, error });
      }
    })

    .patch('/user', (req: TypedRequestBody<User>, res, next) => {
      try {
        return res.status(200).json({ success: true, data: updateUser(req.body) });
      } catch (error) {
        if (error instanceof Error) error = error.message;
        return res.status(500).json({ success: false, error });
      }
    });