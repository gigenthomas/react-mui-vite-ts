import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';
import React from "react";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Log Out
    </Button>
  );
};
