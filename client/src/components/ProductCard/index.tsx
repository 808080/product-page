import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Product } from '../../utils/types';

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  return (
    <Card style={{ height: '100%' }}>
      <Card.Img variant='top' src={product.thumbnail} style={{ height: '300px', objectFit: 'cover', objectPosition: 'center' }} loading='lazy' />
      <Card.Body className='d-flex flex-column'>
        <Card.Title>{product.title.en}</Card.Title>
        <Card.Text>
          {product.description.en}
        </Card.Text>
        <Link to={`/products/${product.id}`} className='d-block mt-auto align-self-end'>
          <Button variant='primary'>Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;