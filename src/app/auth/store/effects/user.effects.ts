import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '@users/services/users.service';
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
          map((token) => {
            const payload = this.authService.decodeToken(token);
            return userSignInSuccess({ token, payload });
          }),
          catchError((error: unknown) => {
            return of(userSignInFailure({ error }));
          }),
        ),
      ),
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userGetInfo, userSignInSuccess),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([, state]) => {
        return this.usersService.getUser(state._id).pipe(
          map((user) => {
            return userGetInfoSuccess({ user });
          }),
          catchError((error: unknown) => {
            return of(userGetInfoFailure({ error }));
          }),
        );
      }),
    );
  });
}
