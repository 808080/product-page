import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='text-center my-5'>
      <h1>404</h1>
      <Link to={'/'}>Return home</Link>
    </div>
  );
};

export default NotFound;