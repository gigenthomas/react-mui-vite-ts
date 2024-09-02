import { Auth0Provider, AppState } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({
  children,
}: PropsWithChildren<Auth0ProviderWithNavigateProps>): JSX.Element | null => {
  const navigate = useNavigate();

  const domain = "dev-h6xscatzzzdp72q5.us.auth0.com";
  const clientId = "lFh07Y3eocoYdcv9VBVx5IVB2bJOnJHn";
  const redirectUri = "http://localhost:3000/callback";
  const audience = "http://localhost:8080";

  console.log("domain", domain);
  console.log("clientId", clientId);
  console.log("redirectUri", redirectUri);
  console.log("audience", audience);
  

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
