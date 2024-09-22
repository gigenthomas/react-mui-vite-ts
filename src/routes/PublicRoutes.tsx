import { Navigate } from 'react-router-dom';
import AboutView from '@/views/About';
import AuthView from '@/views/Auth';
import { PublicLayout } from '@/layout';
import DevView from '@/views/Dev';

const PUBLIC_ROUTES = [
  {
    element: <PublicLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
      {
        path: '/',
        element: <AuthView />,
      },
      {
        path: '/about',
        element: <AboutView />,
      },
      {
        path: '/auth',
        element: <AuthView />,
      },
    ],
  },
];
export default PUBLIC_ROUTES;
