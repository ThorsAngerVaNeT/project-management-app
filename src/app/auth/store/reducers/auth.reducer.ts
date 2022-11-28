import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '@users/store/actions/user.actions';

export interface UserState {
  _id: string;
  name: string;
  login: string;
  token: string;
  loading: boolean;
  error: string;
}

const getTokenFromLocalStorage = (): string => `${localStorage.getItem('token')}`;

export const initialState: UserState = {
  _id: '',
  name: '',
  login: '',
  token: getTokenFromLocalStorage(),
  loading: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(AuthActions.userSignIn, (state: UserState, { data: { login } }): UserState => ({ ...state, login, error: '' })),
  on(
    AuthActions.userSignInSuccess,
    (state: UserState, { token, payload: { id, login } }): UserState => ({
      ...state,
      token,
      _id: id,
      login,
      error: '',
    }),
  ),
  on(AuthActions.userSignOut, AuthActions.clearUserState, (): UserState => ({ ...initialState, token: '' })),
  on(
    AuthActions.userSignUp,
    (state: UserState, { data: { name, login } }): UserState => ({ ...state, name, login, loading: true, error: '' }),
  ),
  on(
    AuthActions.userSignUpSuccess,
    (state: UserState, { user }): UserState => ({ ...state, ...user, loading: false, error: '' }),
  ),
  on(
    AuthActions.userSignUpFailure,
    (state: UserState, { error }): UserState => ({ ...state, loading: false, error: error.error.message }),
  ),
  on(AuthActions.userGetInfoSuccess, (state: UserState, { user }): UserState => ({ ...state, ...user })),
  on(
    UserActions.updateUser,
    (state: UserState, { user }): UserState => ({ ...state, ...user, loading: true, error: '' }),
  ),
  on(
    UserActions.updateUserSuccess,
    (state: UserState, { user }): UserState => ({ ...state, ...user, loading: false, error: '' }),
  ),
  on(
    UserActions.updateUserFailed,
    (state: UserState, { error }): UserState => ({ ...state, loading: false, error: error?.error.message }),
  ),
  on(AuthActions.userUpdateGetInfoSuccess, (state: UserState, { user }): UserState => ({ ...state, ...user })),
  on(AuthActions.setCurrentUserId, (state: UserState, { id }): UserState => ({ ...state, _id: id })),
);
