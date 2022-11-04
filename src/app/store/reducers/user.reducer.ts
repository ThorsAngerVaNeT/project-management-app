import { createReducer, on } from '@ngrx/store';
import { userSignIn, userSignInSuccess } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  _id: string;
  name: string;
  login: string;
  token: string;
}

export const initialState: State = {
  _id: '',
  name: '',
  login: '',
  token: '',
};

export const reducer = createReducer(
  initialState,
  on(userSignIn, (state: State, { data: { login } }): State => ({ ...state, login })),
  on(userSignInSuccess, (state: State, { token }): State => ({ ...state, token })),
);
