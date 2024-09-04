import {
  // envRequired,
  getCurrentEnvironment,
  getCurrentVersion,
} from '@/utils/environment';

export const IS_DEBUG = import.meta.env.VITE_DEBUG === 'true'; // Enables logging, etc.

export const IS_PRODUCTION = getCurrentEnvironment() === 'production'; // Enables analytics, etc.

// export const PUBLIC_URL = envRequired(import.meta.env.VITE_PUBLIC_URL); // Variant 1: .env variable is required
export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL; // Variant 2: .env variable is optional

export const IS_FAKE_LOGIN = import.meta.env.VITE_FAKE_LOGIN === 'true'; // Enables fake login for development

export const REACT_APP_AUTH0_DOMAIN = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;

export const REACT_APP_AUTH0_CLIENT_ID = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID
export const REACT_APP_AUTH0_CALLBACK_URL = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL
export const REACT_APP_AUTH0_AUDIENCE = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE
export const REACT_APP_API_SERVER_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL

IS_DEBUG &&
  console.log('@/config', {
    environment: getCurrentEnvironment(),
    version: getCurrentVersion(),
    PUBLIC_URL,
    IS_PRODUCTION,
    IS_DEBUG,
    IS_FAKE_LOGIN,
    REACT_APP_AUTH0_DOMAIN
  });
