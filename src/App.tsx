import { ThemeProvider } from '@/theme';
import StoreProvider from '@/store';
import { ErrorBoundary } from '@/components';
import Routes from '@/routes';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from "react-query";
import { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } from './config';

/**
 * Root Application Component
 * @component MainApp
 */
const MainApp = () => {

  const queryClient = new QueryClient();

  return (
   
<QueryClientProvider client={queryClient}>
<Auth0Provider
    domain={REACT_APP_AUTH0_DOMAIN}
    clientId={REACT_APP_AUTH0_CLIENT_ID}
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
  </QueryClientProvider>

  );
};

export default MainApp;
