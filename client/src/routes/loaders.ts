import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import httpRequest, { HTTPmethods } from '../utils/httpRequest';
import { Product, UserDAO } from '../utils/types';
import { getUserId } from '../utils/userStore';

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
  const product = await httpRequest<Product>(HTTPmethods.GET, `/product/${params.productId}`);
  if (!product.success) throw new Error('Page not found');
  return product.data;
};

export const userLoader = async () => {
  const userId = getUserId();
  if (userId) {
    const user = await httpRequest<UserDAO>(HTTPmethods.GET, `/user/${userId}`);
    if (user.success) return user.data;
  }
  return redirect('/signup');
};