import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as PointActions from '../actions/point.actions';

@Injectable()
export class PointEffects {
  loadPoints$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPoints),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => PointActions.loadPointsSuccess({ data })),
          catchError((error) => of(PointActions.loadPointsFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private actions$: Actions) {}
}
