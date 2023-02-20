import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/404';
import Home from '../pages/Home';
import PremiumProducts from '../pages/PremiumProducts';
import ProductPage from '../pages/Product';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import { productLoader, userLoader } from './loaders';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/premium-products',
        element: <PremiumProducts />,
      },
      {
        path: '/products/:productId',
        element: <ProductPage />,
        loader: productLoader
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profile',
        element: <Profile />,
        loader: userLoader
      },
    ],
  },
]);