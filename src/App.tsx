import { ThemeProvider } from '@/theme';
import StoreProvider from '@/store';
import { ErrorBoundary } from '@/components';
import Routes from '@/routes';
import { Auth0Provider } from '@auth0/auth0-react';

/**
 * Root Application Component
 * @component MainApp
 */
const MainApp = () => {
  return (
   

<Auth0Provider
    domain="dev-h6xscatzzzdp72q5.us.auth0.com"
    clientId="lFh07Y3eocoYdcv9VBVx5IVB2bJOnJHn"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <ErrorBoundary name="App">
      <StoreProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </StoreProvider>
    </ErrorBoundary>
    </Auth0Provider>
  );
};

export default MainApp;
