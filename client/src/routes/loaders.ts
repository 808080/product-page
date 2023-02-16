import { LoaderFunctionArgs } from 'react-router-dom';
import httpRequest, { HTTPmethods } from '../utils/httpRequest';
import { Product } from '../utils/types';

export const productLoader = async ({ params, context }: LoaderFunctionArgs) => {
  const product = await httpRequest<Product>(HTTPmethods.GET, `/product/${params.productId}`);
  if (!product.success) throw new Error('Page not found');
  return product.data;
};