import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../../users/services/users.service';
import {
  userGetInfo,
  userGetInfoFailure,
  userGetInfoSuccess,
  userSignIn,
  userSignInFailure,
  userSignInSuccess,
} from '../actions/user.actions';
import { selectUser } from '../selectors/user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersService: UsersService,
    private store: Store,
  ) {}

  userSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userSignIn),
      exhaustMap((action) =>
        this.authService.signIn(action.data).pipe(
          map((token) => userSignInSuccess({ token })),
          catchError((error: unknown) => of(userSignInFailure({ error }))),
        ),
      ),
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userGetInfo),
      exhaustMap(() =>
        this.usersService.getUsers().pipe(
          withLatestFrom(this.store.select(selectUser)),
          map(([users, state]) => {
            const user = users.find((u) => u.login === state.login)!;
            return userGetInfoSuccess({ user });
          }),
          catchError((error: unknown) => {
            return of(userGetInfoFailure({ error }));
          }),
        ),
      ),
    );
  });
}
