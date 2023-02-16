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


const findInProducts = (products: Array<Product>, id: Product['id']) => {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error('Product not found');
  return product;
}

export const getProducts: GetManyProducts = () => readJSON('products')!;
export const getPremiumProducts: GetManyProducts = () => readJSON('premium-products')!;
export const getProductById: GetOneProduct = (id) => findInProducts(getProducts(), id);
export const getPremiumProductById: GetOneProduct = (id) => findInProducts(getPremiumProducts(), id);

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