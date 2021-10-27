import { AuthAction, AuthActionTypes } from '../actions/authActions';
import { AuthState } from '../types';

const initialState: AuthState = {
  token: '',
  username: '',
  isAuthenticated: false,
  isLoading: false,
  error: false,
  msg: ''
};

// eslint-disable-next-line
const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case AuthActionTypes.AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload
      };

    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: false,
        msg: ''
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        username: action.payload.username,
        isAuthenticated: true
      };

    default:
      return state;
  }
};

export default reducer;
