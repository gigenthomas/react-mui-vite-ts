import { Navigate } from 'react-router-dom';
import { PrivateLayout } from '@/layout';
import { NotFoundView } from '@/views';
import AboutView from '@/views/About';
import DevView from '@/views/Dev';
import WelcomeView from '@/views/Welcome';
import ProfileView from '@/views/Profile/ProfileView';
import ProtectedView from '@/views/ProtectedView/protected-view';
import InviteView from '@/views/InviteView/InviteView';

const PRIVATE_ROUTES = [
  {
    element: <PrivateLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <NotFoundView />,
      },
      {
        path: '/',
        element: <WelcomeView />,
      },
      {
        path: 'auth/*',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'about',
        element: <AboutView />,
      },
      {
        path: '/me',
        element: <ProfileView />,
      },
      {
        path: '/protected',
        element: <ProtectedView />,
      },
      {
        path: '/invite',
        element: <InviteView />,
      },
      
    ],
  },
];


export default PRIVATE_ROUTES;
