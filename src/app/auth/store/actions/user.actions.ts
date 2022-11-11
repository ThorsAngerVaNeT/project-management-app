import { createAction, props } from '@ngrx/store';
import { SignInParams, TokenPayload, User } from '@users/models/user.model';

export const userSignIn = createAction('[Auth] User Sign In', props<{ data: SignInParams }>());

export const userSignInSuccess = createAction(
  '[Auth] User Sign In Success',
  props<{ token: string; payload: TokenPayload }>(),
);

export const userSignInFailure = createAction('[Auth] User Sign In Failure', props<{ error: unknown }>());

export const userGetInfo = createAction('[Auth] User Get Info');

export const userGetInfoSuccess = createAction('[Auth] User Get Info Success', props<{ user: User }>());

export const userGetInfoFailure = createAction('[Auth] User Get Info Failure', props<{ error: unknown }>());

export const getUsers = createAction('[Auth] Get Users', props<{ users: User[] }>());
