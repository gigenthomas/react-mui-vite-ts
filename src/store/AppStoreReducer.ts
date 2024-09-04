import { localStorageSet } from '@/utils/localStorage';
import { AppStoreState } from './config';
import { User } from './types';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const DARK_MODE = 'DARK_MODE';
export const AUTH0_REDIRECT = 'AUTH0_REDIRECT';



interface Auth0RedirectAction {
  type: typeof AUTH0_REDIRECT;
  payload: undefined
 
}


interface LogInAction {
  type: typeof LOG_IN;
  payload: User;
}

interface DarkModeAction {
  type: typeof DARK_MODE;
  payload: boolean;
}

interface LogOutAction {
  type: typeof LOG_OUT;
}



export type AppStoreAction = LogInAction | LogOutAction | DarkModeAction | Auth0RedirectAction;


/**
 * Reducer for global AppStore using "Redux styled" actions
 * @param {object} state - current/default state
 * @param {string} action.type - unique name of the action
 * @param {*} [action.payload] - optional data object or the function to get data object
 */
const AppStoreReducer: React.Reducer<AppStoreState, AppStoreAction> = (state, action) => {

  switch (action.type) {
   
    case AUTH0_REDIRECT:
    case LOG_IN :
      console.log('LOG_IN');
      return {
        ...state,
        isAuthenticated: true,
        currentUser : action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null, // Also reset previous user data
      };
    case DARK_MODE: {
      const darkMode: boolean = Boolean(action.payload);
      localStorageSet('darkMode', darkMode);
      return {
        ...state,
        darkMode,
       
      };
    }
    default:
      return state;
  }
};

export default AppStoreReducer;
