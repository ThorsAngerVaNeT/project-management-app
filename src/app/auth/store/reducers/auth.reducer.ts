import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '@users/store/actions/user.actions';

export interface AuthState {
  _id: string;
  name: string;
  login: string;
  token: string;
  loading: boolean;
  error: string;
}

const getTokenFromLocalStorage = (): string => `${localStorage.getItem('token')}`;

export const initialState: AuthState = {
  _id: '',
  name: '',
  login: '',
  token: getTokenFromLocalStorage(),
  loading: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(
    AuthActions.userSignIn,
    (state: AuthState, { data: { login } }): AuthState => ({ ...state, login, loading: true, error: '' }),
  ),
  on(
    AuthActions.userSignInSuccess,
    (state: AuthState, { token, payload: { id, login } }): AuthState => ({
      ...state,
      token,
      _id: id,
      login,
      loading: false,
      error: '',
    }),
  ),
  on(
    AuthActions.userSignInFailure,
    (state: AuthState, { error }): AuthState => ({ ...state, loading: false, error: `${error}` }),
  ),
  on(AuthActions.userSignOut, AuthActions.clearUserState, (): AuthState => ({ ...initialState, token: '' })),
  on(
    AuthActions.userSignUp,
    (state: AuthState, { data: { name, login } }): AuthState => ({ ...state, name, login, loading: true, error: '' }),
  ),
  on(
    AuthActions.userSignUpSuccess,
    (state: AuthState, { user }): AuthState => ({ ...state, ...user, loading: false, error: '' }),
  ),
  on(
    AuthActions.userSignUpFailure,
    (state: AuthState, { error }): AuthState => ({ ...state, loading: false, error: `${error}` }),
  ),
  on(AuthActions.userGetInfoSuccess, (state: AuthState, { user }): AuthState => ({ ...state, ...user })),
  on(
    UserActions.updateUser,
    (state: AuthState, { user }): AuthState => ({ ...state, ...user, loading: true, error: '' }),
  ),
  on(
    UserActions.updateUserSuccess,
    (state: AuthState, { user }): AuthState => ({ ...state, ...user, loading: false, error: '' }),
  ),
  on(
    UserActions.updateUserFailed,
    (state: AuthState, { error }): AuthState => ({ ...state, loading: false, error: `${error}` }),
  ),
  on(AuthActions.userUpdateGetInfoSuccess, (state: AuthState, { user }): AuthState => ({ ...state, ...user })),
  on(UserActions.deleteUser, (state: AuthState): AuthState => ({ ...state, loading: true })),
  on(UserActions.deleteUserSuccess, (): AuthState => ({ ...initialState, token: '' })),
  on(UserActions.deleteUserFailed, (state: AuthState): AuthState => ({ ...state, loading: false })),
  on(AuthActions.userCleanErrorMessage, (state: AuthState): AuthState => ({ ...state, error: '' })),
);
