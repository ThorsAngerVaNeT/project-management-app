import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User, UserParams } from '../../model/user.model';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());

// export const loadUser = createAction('[Users] Load User', props<{ id: User['_id'] }>());
// export const loadUserSuccess = createAction('[Users] Load User Success', props<{ user: User }>());
// export const loadUserFailed = createAction('[Users] Load User Failed', props<{ error: unknown }>());

// export const createUser = createAction('[Users] Create User', props<{ user: UserParams }>());
// export const createUserSuccess = createAction('[Users] Create User Success', props<{ user: User }>());
// export const createUserFailed = createAction('[Users] Create User Failed', props<{ error: unknown }>());

export const updateUser = createAction('[Users] Update User', props<{ userId: User['_id']; user: UserParams }>());
export const updateUserSuccess = createAction(
  '[Users] Update User Success (state users)',
  props<{ user: Update<User> }>(),
);
export const updateUserFailed = createAction('[Users] Update User Failed', props<{ error: unknown }>());

// export const changeAfterUserUpdateSuccess = createAction(
//   '[Users] Update User State (user & users) After User Update Success',
//   props<{ user: Update<User> }>(),
// );
// export const userGetInfoSuccess = createAction(
//   '[Users] Update Info (state user) After User Update Success',
//   props<{ user: Update<User> }>(),
// );

export const deleteUser = createAction('[Users] Delete User', props<{ id: User['_id'] }>());
export const deleteUserSuccess = createAction('[Users] Delete User Success', props<{ id: User['_id'] }>());
export const deleteUserFailed = createAction('[Users] Delete User Failed', props<{ error: unknown }>());

// export const afterUserDeleteSuccess = createAction(
//   '[Users] After User Delete User Success',
//   props<{ id: User['_id'] }>(),
// );
