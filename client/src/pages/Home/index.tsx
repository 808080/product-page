import { Button, Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ProductCard from '../../components/ProductCard';
import { useTypedSelector } from '../../store/hooks';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { Product } from '../../utils/types';

const Home = () => {
  const { isLoading, data } = useQuery('products', async () => {
    const products = await httpRequest<Product[]>(HTTPmethods.GET, '/products');
    if (!products.success) throw new Error('Server error');
    return products.data;
  });

  const { data: user } = useTypedSelector(state => state.user);

  return (
    <div>
      {
        isLoading ?
          <Loader /> :
          <>
            <div className='d-sm-flex justify-content-between align-items-center'>
              <h2>Product list</h2>

              {user && <Link to='/premium-products'>
                <Button variant='info'>Premium products</Button>
              </Link>}
            </div>

            <Row className='my-4' xs={1} md={2} lg={3}>
              {data?.map((p) =>
                <Col className='mb-4' key={p.id}>
                  <ProductCard product={p} />
                </Col>
              )}
            </Row>
          </>
      }
    </div>
  );
};

export default Home;