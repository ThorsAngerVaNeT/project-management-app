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
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadUsersFailed({ error }))),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap(({ userId, user }) =>
        this.userService.updateUser(userId, user).pipe(
          switchMap(({ _id: id, ...changes }) => [
            UserActions.updateUserSuccess({ user: { id, changes } }),
            AuthActions.userGetInfoSuccess({ user: { _id: id, ...changes } }),
          ]),
          catchError((error) => of(UserActions.updateUserFailed({ error }))),
        ),
      ),
    );
  });
}
