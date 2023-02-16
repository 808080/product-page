import { Router } from 'express';
import { getPremiumProducts, getProductById, getRegularProducts, productQuery } from '../utils/product';

export const productRouterFactory = () =>
  Router()
    .get('/products', (req, res, next) => {
      const result = productQuery({ queryMany: getRegularProducts });
      return res.status(result.status).json(result.data);
    })

    .get('/product/:id', (req, res, next) => {
      const result = productQuery({ queryOne: getProductById, id: +req.params.id });
      return res.status(result.status).json(result.data);
    })

    .get('/premium-products', (req, res, next) => {
      const result = productQuery({ queryMany: getPremiumProducts });
      return res.status(result.status).json(result.data);
    });