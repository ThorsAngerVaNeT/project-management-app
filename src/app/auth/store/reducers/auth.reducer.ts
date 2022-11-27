import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '@users/store/actions/user.actions';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AuthState {
  _id: string;
  name: string;
  login: string;
  token: string;
  loading: boolean;
  error: string;
}

export const initialState: AuthState = {
  _id: '',
  name: '',
  login: '',
  token: '',
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
  on(AuthActions.userSignOut, (): AuthState => ({ ...initialState })),
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
    (state: AuthState, { error }): AuthState => ({ ...state, loading: false, error: error.error.message }),
  ),
  on(AuthActions.userUpdateGetInfoSuccess, (state: AuthState, { user }): AuthState => ({ ...state, ...user })),
);

export const localStorageSyncReducer = (reducer: ActionReducer<Action>): ActionReducer<Action> => {
  return localStorageSync({ keys: ['_id', 'name', 'login', 'token'], rehydrate: true })(reducer);
};

export const userMetaReducers: MetaReducer[] = [localStorageSyncReducer];
