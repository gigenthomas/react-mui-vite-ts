import { User } from "./types";

/**
 * Structure of the "State" in the AppStore
 */
export interface AppStoreState {

  isAuthenticated: boolean;

  currentUser: User | null | unknown;

  darkMode: boolean;

}

/**
 * Initial values of the "State" in the AppStore
 */
export const INITIAL_APP_STORE_STATE: AppStoreState = {
  darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') or from localStorage
  isAuthenticated: false, // Overridden in AppStore by checking auth token
  currentUser: null, // Overridden in AppStore by checking auth token
};
