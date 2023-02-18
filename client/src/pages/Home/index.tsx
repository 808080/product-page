import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { Product } from '../../utils/types';

const Home = () => {
  const { isLoading, data } = useQuery('products', async () => {
    const product = await httpRequest<Product[]>(HTTPmethods.GET, '/products');
    if (!product.success) throw new Error('Server error');
    return product.data;
  });

  return (
    <div>
      {
        isLoading ?
          <Loader /> :
          <>
            {data?.map((p) => <div key={p.id}>{p.title.en}</div>)}
          </>
      }
    </div>
  );
};

export default Home;