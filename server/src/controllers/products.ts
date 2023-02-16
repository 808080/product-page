import { Router } from 'express';
import { getPremiumProductById, getPremiumProducts, getProductById, getProducts, productQuery } from '../utils/product';

export const productRouterFactory = () =>
  Router()
    .get('/products', (req, res, next) => {
      const result = productQuery({ queryMany: getProducts });
      return res.status(result.status).json(result.data);
    })

    .get('/product/:id', (req, res, next) => {
      const result = productQuery({ queryOne: getProductById, id: +req.params.id });
      return res.status(result.status).json(result.data);
    })

    .get('/premium-products', (req, res, next) => {
      const result = productQuery({ queryMany: getPremiumProducts });
      return res.status(result.status).json(result.data);
    })

    .get('/premium-product/:id', (req, res, next) => {
      const result = productQuery({ queryOne: getPremiumProductById, id: +req.params.id });
      return res.status(result.status).json(result.data);
    });