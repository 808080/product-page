import express from 'express';
import { userRouterFactory } from './controllers/user';
import cors from 'cors';
import { authRouterFactory } from './controllers/auth';
import { productRouterFactory } from './controllers/products';

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouterFactory());
app.use(userRouterFactory());
app.use(productRouterFactory());

export default app;