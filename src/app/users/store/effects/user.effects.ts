import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, repeat, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import * as AuthActions from '@auth/store/actions/auth.actions';
import { UsersService } from '../../services/users.service';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private storeFacade: StoreFacade,
    private notification: NzNotificationService,
    private translateService: TranslateService,
  ) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => this.userService.getUsers()),
      map((users) => UserActions.loadUsersSuccess({ users })),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap(({ userId, user }) => this.userService.updateUser(userId, user)),
      map(({ _id: id, ...changes }) => UserActions.updateUserSuccess({ user: { id, changes } })),
      catchError((error) => of(UserActions.updateUserFailed({ error }))),
      repeat(),
    );
  });

  updateUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserSuccess),
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
      map((user$) => UserActions.deleteUserSuccess({ id: user$._id })),
      catchError((error) => of(UserActions.deleteUserFailed({ error }))),
      repeat(),
    );
  });

  deleteUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        tap(() => this.storeFacade.redirectToWelcome()),
      );
    },
    { dispatch: false },
  );

  updateUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() =>
          this.notification.create(
            'success',
            this.translateService.instant('successTitle'),
            this.translateService.instant('successTextProfileUpdate'),
          ),
        ),
      );
    },
    { dispatch: false },
  );
}
