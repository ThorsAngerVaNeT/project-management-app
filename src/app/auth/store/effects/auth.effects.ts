import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, repeat, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '@users/services/users.service';
import * as AuthActions from '../actions/auth.actions';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersService: UsersService,
    private storeFacade: StoreFacade,
  ) {}

  userSignUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userSignUp),
      exhaustMap(({ data }) =>
        this.authService.signUp(data).pipe(
          map((user) => AuthActions.userSignUpSuccess({ data, user })),
          catchError((error) => of(AuthActions.userSignUpFailure({ error }))),
        ),
      ),
    );
  });

  userSignInAfterSignUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userSignUpSuccess),
      map(({ data }) => AuthActions.userSignIn({ data: { login: data.login, password: data.password } })),
    );
  });

  userSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userSignIn),
      exhaustMap((action) => this.authService.signIn(action.data)),
      map((token) => {
        const payload = this.storeFacade.decodeToken(token);
        localStorage.setItem('token', token);
        return AuthActions.userSignInSuccess({ token, payload });
      }),
      catchError((error) => of(AuthActions.userSignInFailure({ error }))),
      repeat(),
    );
  });

  userSignInSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.userSignInSuccess),
        tap(() => {
          this.storeFacade.redirectToBoard();
        }),
      );
    },
    { dispatch: false },
  );

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userGetInfo, AuthActions.userSignInSuccess),
      concatLatestFrom(() => this.storeFacade.token$),
      concatMap(([, token]) => {
        const { id } = this.storeFacade.decodeToken(token);
        return this.usersService.getUser(id).pipe(
          map((user) => AuthActions.userGetInfoSuccess({ user })),
          catchError((error) => of(AuthActions.userGetInfoFailure({ error }))),
        );
      }),
    );
  });

  userSignOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.userSignOut),
        tap(() => {
          localStorage.setItem('token', '');
          this.storeFacade.redirectToWelcome();
        }),
      );
    },
    { dispatch: false },
  );

  clearUserState$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.clearUserState),
        tap(() => localStorage.setItem('token', '')),
      );
    },
    { dispatch: false },
  );
}
