import { useAppStore } from "@/store/AppStore";
import { sessionStorageSet } from "@/utils/sessionStorage";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';
import React from "react";
import { useNavigate } from 'react-router-dom';

export const LoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect  } = useAuth0();
  const [, dispatch] = useAppStore();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    }
 
  );

  console.log("LoginButton");
  onLogin();

  };


  const onLogin = () => {
    // TODO: AUTH: Sample of access token store, replace next line in real application
    sessionStorageSet('access_token', 'TODO:_save-real-access-token-here');

    dispatch({ type: 'LOG_IN' });
    navigate('/', { replace: true }); // Redirect to home page without ability to go back
  };

  return (

    <Button color="inherit" onClick={handleLogin}>
      Login 
      </Button>

 
  );
};
