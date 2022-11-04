import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { userSignIn, userSignInFailure, userSignInSuccess } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
}
