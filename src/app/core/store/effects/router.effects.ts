import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import * as RouterActions from '../actions/router.action';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { StoreFacade } from '../../services/store-facade/store-facade';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router, private storeFacade: StoreFacade) {}

  redirectToBoard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.redirectToBoard),
        tap(() => this.router.navigateByUrl('/boards')),
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

  routeChange$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        tap(() => this.storeFacade.clearErrorMessage()),
      );
    },
    { dispatch: false },
  );
}
