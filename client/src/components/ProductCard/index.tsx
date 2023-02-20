import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Lang, Product } from '../../utils/types';

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as keyof Lang;

  return (
    <Card style={{ height: '100%' }}>
      <Card.Img variant='top' alt={product.title[lang] || product.title.en} src={product.thumbnail} style={{ height: '300px', objectFit: 'cover', objectPosition: 'center' }} loading='lazy' />
      <Card.Body className='d-flex flex-column'>
        <Card.Title>{product.title[lang] || product.title.en}</Card.Title>
        <Card.Text>
          {product.description[lang] || product.description.en}
        </Card.Text>
        <Link to={`/products/${product.id}`} className='d-block mt-auto align-self-end'>
          <Button variant='primary'>{t('Details')}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;