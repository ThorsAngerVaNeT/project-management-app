import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '@users/services/users.service';
import * as AuthActions from '../actions/user.actions';
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
      ofType(AuthActions.userSignIn),
      concatMap((action) =>
        this.authService.signIn(action.data).pipe(
          map((token) => {
            const payload = this.authService.decodeToken(token);
            return AuthActions.userSignInSuccess({ token, payload });
          }),
          catchError((error) => of(AuthActions.userSignInFailure({ error }))),
        ),
      ),
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userGetInfo, AuthActions.userSignInSuccess),
      concatLatestFrom(() => this.store.select(selectUser)),
      concatMap(([, state]) =>
        this.usersService.getUser(state._id).pipe(
          map((user) => AuthActions.userGetInfoSuccess({ user })),
          catchError((error) => of(AuthActions.userGetInfoFailure({ error }))),
        ),
      ),
    );
  });
}
