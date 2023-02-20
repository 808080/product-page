import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks';
import { Lang, Product } from '../../utils/types';
import NotFound from '../404';

const ProductPage = () => {
  const product = useLoaderData() as Product;
  const { data: user } = useTypedSelector(state => state.user);

  if (product.isPremium && !user) return <NotFound />;
  const { i18n } = useTranslation();
  const lang = i18n.language as keyof Lang;

  return (
    <div className='container col-xxl-8 px-4 py-5'>
      <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
        <div className='col-10 col-sm-8 col-lg-6'>
          <img src={product.thumbnail} className='d-block mx-lg-auto img-fluid' alt={product.title[lang] || product.title.en} loading='lazy' />
        </div>
        <div className='col-lg-6'>
          <h1 className='display-6 fw-bold lh-1 mb-3'>{product.title[lang] || product.title.en}</h1>
          <p className='lead'>{product.description[lang] || product.description.en}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;