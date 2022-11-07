import { createReducer, on } from '@ngrx/store';
import { userGetInfoSuccess, userSignIn, userSignInSuccess } from '../actions/user.actions';

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
  on(userSignInSuccess, (state: UserState, { token }): UserState => ({ ...state, token })),
  on(userGetInfoSuccess, (state: UserState, { user }): UserState => ({ ...state, ...user })),
);
