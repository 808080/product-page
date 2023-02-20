import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { useTypedDispatch, useTypedSelector } from './store/hooks';
import Loader from './components/Loader';
import { useEffect } from 'react';
import { getUser } from './store/dispatchers/user';

const App = () => {
  const { data: user, isLoading } = useTypedSelector(state => state.user);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (user) return;
    dispatch(getUser());
  }, [user?.id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (<>
        <Header user={user || undefined} />
        <main>
          <Container className='py-3'>
            <Outlet />
          </Container>
        </main>
      </>
      )}
    </>
  );
};

export default App;
