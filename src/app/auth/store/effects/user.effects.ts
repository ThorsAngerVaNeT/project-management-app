import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '@users/services/users.service';
import * as AuthActions from '../actions/user.actions';
import { Router } from '@angular/router';
import { StoreFacade } from '../../../core/services/store-facade/store-facade';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersService: UsersService,
    private storeFacade: StoreFacade,
    private router: Router,
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

  userSignOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.userSignOut),
        tap(() => this.router.navigateByUrl('/')),
      );
    },
    { dispatch: false },
  );

  userSignUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userSignUp),
      concatMap(({ data }) =>
        this.authService.signUp(data).pipe(
          map((user) => AuthActions.userSignUpSuccess({ user })),
          catchError((error) => of(AuthActions.userSignUpFailure({ error }))),
        ),
      ),
    );
  });

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
}
