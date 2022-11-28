import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import * as RouterActions from '../actions/router.action';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) {}

  redirectToBoard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.redirectToBoard),
        tap(() => this.router.navigateByUrl('/board')),
      );
    },
    { dispatch: false },
  );

  redirectToRoot$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.redirectToRoot),
        tap(() => this.router.navigateByUrl('/')),
      );
    },
    { dispatch: false },
  );

  redirectToWelcome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.redirectToWelcome),
        tap(() => this.router.navigateByUrl('/welcome')),
      );
    },
    { dispatch: false },
  );
}
