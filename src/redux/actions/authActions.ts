import { Dispatch } from 'redux';
import AuthService from '../../services/auth.service';

export enum AuthActionTypes {
  AUTH_LOADING = 'authLoading',
  AUTH_ERROR = 'authError',
  LOGIN_SUCCESS = 'loginSuccess',
  REGISTER_SUCCESS = 'registerSuccess',
  LOGOUT_SUCCESS = 'logoutSuccess',
  CLEAR_ERROR = 'clearError'
}

interface AuthLoadingAction {
  type: AuthActionTypes.AUTH_LOADING;
}

interface AuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR;
  payload: string;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: { username: string; token: string };
}

interface ClearErrorAction {
  type: AuthActionTypes.CLEAR_ERROR;
}

export type AuthAction =
  | AuthLoadingAction
  | AuthErrorAction
  | LoginSuccessAction
  | ClearErrorAction;

// eslint-disable-next-line
export const login = (username: string, password: string) => {
  // eslint-disable-next-line
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.AUTH_LOADING });

    try {
      const res = await AuthService.login(username, password);
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: { username, token: res.data.token }
      });
      //eslint-disable-next-line
    } catch (e: any) {
      dispatch({
        type: AuthActionTypes.AUTH_ERROR,
        payload: e.response.data.msg
      });
    }
  };
};
