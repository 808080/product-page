import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div className='position-fixed w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-center' style={{ backgroundColor: '#00000033' }}>
      <Spinner animation="border" role="status">
        <span className='visually-hidden'>{t('Loading')}...</span>
      </Spinner>
    </div>
  );
}

export default Loader;