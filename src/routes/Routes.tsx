import { useCallback, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLoading } from '@/components';
import { useAuthWatchdog, useIsAuthenticated } from '@/hooks';
import PRIVATE_ROUTES from './PrivateRoutes';
import PUBLIC_ROUTES from './PublicRoutes';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppStore } from '@/store/AppStore';
import { LOG_IN, LOG_OUT } from '@/store/AppStoreReducer';
import { User } from '@/store/types';

const routesPrivate = createBrowserRouter(PRIVATE_ROUTES);
const routesPublic = createBrowserRouter(PUBLIC_ROUTES);

/**
 * Renders routes depending on Authenticated or Anonymous users
 * @component Routes
 */
const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const isAuthenticated = useIsAuthenticated();
  const { user, isAuthenticated: auth0IsAuthenticated } = useAuth0();
  const [, dispatch] = useAppStore();
  

  const afterLogin = useCallback(() => {
    console.log('afterLogin called');

    setRefreshCount((old) => old + 1); // Force re-render
    if (user) {
      const currentUser: User = {
        id: user.sub,
        name: user.name,
        email: user.email,
        // Add other user properties as needed
      };
      dispatch({ type: LOG_IN, payload: currentUser });
    }
   
    setLoading(false);
  }, []);

  const afterLogout = useCallback(() => {
    setRefreshCount((old) => old + 1); // Force re-render
    dispatch({ type: LOG_OUT });
    setLoading(false);

  }, []);

  // Create Auth watchdog, that calls our callbacks wen user is logged in or logged out
  useAuthWatchdog(afterLogin, afterLogout);

  useEffect(() => {
    if (auth0IsAuthenticated) {
      afterLogin();
    }
  }, [auth0IsAuthenticated]);


  if (loading) {
    return <AppLoading />;
  }

  return <RouterProvider router={isAuthenticated ? routesPrivate : routesPublic} />;
};
export default Routes;
