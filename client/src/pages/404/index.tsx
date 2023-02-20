import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className='text-center my-5'>
      <h1>404</h1>
      <Link to={'/'}>{t('Return home')}</Link>
    </div>
  );
};

export default NotFound;