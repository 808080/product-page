import { readJSON } from './json';
import { Product } from './types';

type GetManyProducts = () => Product[];
type GetOneProduct = (id: Product['id']) => Product;

type ProductQuery =
  | {
    id: Product['id'];
    queryOne: GetOneProduct;
  }
  | {
    id?: undefined;
    queryMany: GetManyProducts;
  };


const getAllProducts: GetManyProducts = () => readJSON('products')!;
export const getRegularProducts: GetManyProducts = () => getAllProducts().filter((p) => !p.isPremium);
export const getPremiumProducts: GetManyProducts = () => getAllProducts().filter((p) => p.isPremium);
export const getProductById: GetOneProduct = (id) => {
  const product = getAllProducts().find((p) => p.id === id);
  if (!product) throw new Error('Product not found');
  return product;
};

export const productQuery = (params: ProductQuery) => {
  try {
    const data = params.id !== undefined ? params.queryOne(params.id) : params.queryMany();
    return {
      status: 200,
      data: { success: true, data }
    };
  } catch (error) {
    if (error instanceof Error) error = error.message;
    return {
      status: 404,
      data: { success: false, error }
    };
  }
};