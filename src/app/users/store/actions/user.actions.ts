import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User, UserParams } from '../../model/user.model';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());

export const updateUser = createAction('[Users] Update User', props<{ userId: User['_id']; user: UserParams }>());
export const updateUserSuccess = createAction(
  '[Users] Update User Success (state users)',
  props<{ user: Update<User> }>(),
);
export const updateUserFailed = createAction('[Users] Update User Failed', props<{ error: unknown }>());

export const deleteUser = createAction('[Users] Delete User', props<{ id: User['_id'] }>());
export const deleteUserSuccess = createAction('[Users] Delete User Success', props<{ id: User['_id'] }>());
export const deleteUserFailed = createAction('[Users] Delete User Failed', props<{ error: unknown }>());
