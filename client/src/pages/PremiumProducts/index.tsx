import { Button, Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ProductCard from '../../components/ProductCard';
import { useTypedSelector } from '../../store/hooks';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { Product } from '../../utils/types';

const PremiumProducts = () => {
  const { data: user } = useTypedSelector(state => state.user);
  if (!user) return <Navigate to='/' />

  const { isLoading, data } = useQuery('premium-products', async () => {
    const products = await httpRequest<Product[]>(HTTPmethods.GET, '/premium-products');
    if (!products.success) throw new Error('Server error');
    return products.data;
  });

  return (
    <div>
      {
        isLoading ?
          <Loader /> :
          <>
            <div className='d-sm-flex justify-content-between align-items-center'>
              <h2>Premium products</h2>

              <Link to='/'>
                <Button variant='info'>Other products</Button>
              </Link>
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

export default PremiumProducts;