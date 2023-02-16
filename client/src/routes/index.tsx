import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/404';
import ProductPage from '../pages/Product';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import { productLoader } from './loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'products/:productId',
        element: <ProductPage />,
        loader: productLoader
      },
    ],
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