import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, repeat, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '@users/services/users.service';
import * as AuthActions from '../actions/auth.actions';
// import { Router } from '@angular/router';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersService: UsersService,
    private storeFacade: StoreFacade, // private router: Router,
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
      concatLatestFrom(() => this.storeFacade.user$),
      concatMap(([, state]) =>
        this.usersService.getUser(state._id).pipe(
          map((user) => AuthActions.userGetInfoSuccess({ user })),
          catchError((error) => of(AuthActions.userGetInfoFailure({ error }))),
        ),
      ),
    );
  });

  userSignOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.userSignOut),
        tap(() => this.storeFacade.redirectToRoot()),
      );
    },
    { dispatch: false },
  );
}
