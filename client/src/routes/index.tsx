import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/404';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);