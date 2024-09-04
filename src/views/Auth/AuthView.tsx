import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useAppStore } from '@/store';
import { useEventLogout } from '@/hooks/auth';
import { AppButton, AppLink, AppView } from '@/components';
import NotImplementedView from '../NotImplementedView';
import { sessionStorageSet } from '@/utils/sessionStorage';
import { useAuth0 } from '@auth0/auth0-react';
import { LOG_IN } from '@/store/AppStoreReducer';
import { User } from '@/store/types';
import { useEffect } from 'react';

const AuthView = () => {
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();
  const onLogout = useEventLogout();
  const { user, isAuthenticated: auth0IsAuthenticated } = useAuth0();

  useEffect(() => {
    if (auth0IsAuthenticated ){
      console.log('auth UseEffect called');

      const currentUser: User = {
        id: user?.sub,
        name: user?.name,
        email: user?.email,
        // Add other user properties as needed
      };
      dispatch({ type: LOG_IN, payload: currentUser });
   
      navigate('/', { replace: true }); // Redirect to home page without ability to go back
    }
  }, [auth0IsAuthenticated]);



  const onLogin = () => {
    // TODO: AUTH: Sample of access token store, replace next line in real application
    sessionStorageSet('access_token', 'TODO:_save-real-access-token-here');

    if (auth0IsAuthenticated ){
      const currentUser: User = {
        id: user?.sub,
        name: user?.name,
        email: user?.email,
        // Add other user properties as needed
      };
      dispatch({ type: LOG_IN, payload: currentUser });
   
      navigate('/', { replace: true }); // Redirect to home page without ability to go back
    }
  };

  return (
    <AppView>
      <NotImplementedView name="Auth" />

      <Stack direction="row" justifyContent="center">
        <AppButton color="primary" onClick={onLogin}>
          Emulate User Login
        </AppButton>
        <AppButton color="secondary" onClick={onLogout}>
          Logout User
        </AppButton>
      </Stack>

      <div>
        The source code is available at <AppLink href="https://github.com/karpolan/react-mui-vite-ts">GitHub</AppLink>
      </div>
    </AppView>
  );
};

export default AuthView;
