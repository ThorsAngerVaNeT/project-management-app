import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/user.actions';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface UserState {
  _id: string;
  name: string;
  login: string;
  token: string;
}

export const initialState: UserState = {
  _id: '',
  name: '',
  login: '',
  token: '',
};

export const userReducer = createReducer(
  initialState,
  on(AuthActions.userSignIn, (state: UserState, { data: { login } }): UserState => ({ ...state, login })),
  on(
    AuthActions.userSignInSuccess,
    (state: UserState, { token, payload: { id, login } }): UserState => ({ ...state, token, _id: id, login }),
  ),
  on(AuthActions.userSignOut, (): UserState => ({ ...initialState })),
  on(AuthActions.userSignUpSuccess, (state: UserState, { user }): UserState => ({ ...state, ...user })),
  on(AuthActions.userGetInfoSuccess, (state: UserState, { user }): UserState => ({ ...state, ...user })),

  on(AuthActions.userUpdateGetInfoSuccess, (state: UserState, { user }): UserState => ({ ...state, ...user })),
);

export const localStorageSyncReducer = (reducer: ActionReducer<Action>): ActionReducer<Action> => {
  return localStorageSync({ keys: ['_id', 'name', 'login', 'token'], rehydrate: true })(reducer);
};

export const userMetaReducers: MetaReducer[] = [localStorageSyncReducer];
