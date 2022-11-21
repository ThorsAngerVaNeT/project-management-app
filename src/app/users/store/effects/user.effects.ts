import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import * as AuthActions from '@auth/store/actions/user.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => this.userService.getUsers()),
      map((users) => UserActions.loadUsersSuccess({ users })),
      catchError((error) => of(UserActions.loadUsersFailed({ error }))),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap(({ userId, user }) => this.userService.updateUser(userId, user)),
      map(({ _id: id, ...changes }) => UserActions.changeAfterUserUpdateSuccess({ user: { id, changes } })),
      catchError((error) => of(UserActions.updateUserFailed({ error }))),
    );
  });

  updateUserState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.changeAfterUserUpdateSuccess),
      map((user) => UserActions.updateUserSuccess(user)),
    );
  });

  updateUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.changeAfterUserUpdateSuccess),
      map((user) =>
        AuthActions.userUpdateGetInfoSuccess({
          user: {
            _id: String(user.user.id),
            name: String(user.user.changes.name),
            login: String(user.user.changes.login),
          },
        }),
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap(({ id }) => this.userService.deleteUser(id)),
      map((user$) => UserActions.afterUserDeleteSuccess({ id: user$._id })),
      catchError((error) => of(UserActions.deleteUserFailed({ error }))),
    );
  });

  deleteUserSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.afterUserDeleteSuccess),
      map(({ id }) => UserActions.deleteUserSuccess({ id: id })),
    );
  });

  userSignOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.afterUserDeleteSuccess),
      map(() => AuthActions.userSignOut()),
    );
  });
}
