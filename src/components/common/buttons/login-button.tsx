import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';
import React from "react";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect  } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (

    <Button color="inherit" onClick={handleLogin}>
      Login 
      </Button>

 
  );
};
