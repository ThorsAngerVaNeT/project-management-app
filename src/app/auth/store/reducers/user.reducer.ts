import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { userGetInfoSuccess, userSignIn, userSignInSuccess } from '../actions/user.actions';
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
  on(userSignIn, (state: UserState, { data: { login } }): UserState => ({ ...state, login })),
  on(
    userSignInSuccess,
    (state: UserState, { token, payload: { id, login } }): UserState => ({ ...state, token, _id: id, login }),
  ),
  on(userGetInfoSuccess, (state: UserState, { user }): UserState => ({ ...state, ...user })),
);

export const localStorageSyncReducer = (reducer: ActionReducer<Action>): ActionReducer<Action> => {
  return localStorageSync({ keys: ['_id', 'name', 'login', 'token'], rehydrate: true })(reducer);
};

export const userMetaReducers: MetaReducer[] = [localStorageSyncReducer];
