import { useLoaderData } from 'react-router-dom';
import { Product } from '../../utils/types';
import NotFound from '../404';

const ProductPage = () => {
  const product = useLoaderData() as Product;
  const loggedIn = false;

  if (product.isPremium && !loggedIn) return <NotFound />;


  return (
    <div>
      <p>
        {product.title.en}
      </p>
      <p>
        {product.description.en}
      </p>
      <img src={product.thumbnail} alt={product.title.en} />
    </div>
  );
};

export default ProductPage;