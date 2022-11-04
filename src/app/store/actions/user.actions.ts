import { createAction, props } from '@ngrx/store';
import { SignInParams } from '../../users/models/user.model';

export const userSignIn = createAction('[App] User Sign In', props<{ data: SignInParams }>());

export const userSignInSuccess = createAction('[App] User Sign In Success', props<{ token: string }>());

export const userSignInFailure = createAction('[App] User Sign In Failure', props<{ error: unknown }>());
