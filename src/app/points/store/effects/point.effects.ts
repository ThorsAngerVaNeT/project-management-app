import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as PointActions from '../actions/point.actions';
import { PointsService } from '../../services/points.service';

@Injectable()
export class PointEffects {
  constructor(private actions$: Actions, private pointsService: PointsService) {}

  loadPointsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPointsSet),
      concatMap(({ ids }) =>
        this.pointsService.getPointsSet(ids).pipe(
          map((points) => PointActions.loadPointsSetSuccess({ points })),
          catchError((error) => of(PointActions.loadPointsSetFailure({ error }))),
        ),
      ),
    );
  });

  loadPointsByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPointsByUser),
      concatMap(({ userId }) =>
        this.pointsService.getPointsByUser(userId).pipe(
          map((points) => PointActions.loadPointsByUserSuccess({ points })),
          catchError((error) => of(PointActions.loadPointsByUserFailure({ error }))),
        ),
      ),
    );
  });

  loadPointsByTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPointsByTask),
      concatMap(({ taskId }) =>
        this.pointsService.getPointsByTask(taskId).pipe(
          map((points) => PointActions.loadPointsByTaskSuccess({ points })),
          catchError((error) => of(PointActions.loadPointsByTaskFailure({ error }))),
        ),
      ),
    );
  });

  createPoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.createPoint),
      concatMap(({ point: pointParams }) =>
        this.pointsService.createPoint(pointParams).pipe(
          map((point) => PointActions.createPointSuccess({ point })),
          catchError((error) => of(PointActions.createPointFailure({ error }))),
        ),
      ),
    );
  });

  updatePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.updatePoint),
      concatMap(({ pointId, pointParams }) =>
        this.pointsService.updatePoint(pointId, pointParams).pipe(
          map(({ _id: id, ...changes }) => PointActions.updatePointSuccess({ point: { id, changes } })),
          catchError((error) => of(PointActions.updatePointFailure({ error }))),
        ),
      ),
    );
  });

  updatePointsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.updatePointsSet),
      concatMap(({ pointsParams }) =>
        this.pointsService.updatePointsSet(pointsParams).pipe(
          map((points) =>
            PointActions.updatePointsSetSuccess({
              points: points.map(({ _id: id, ...changes }) => ({
                id,
                changes,
              })),
            }),
          ),
          catchError((error) => of(PointActions.updatePointsSetFailure({ error }))),
        ),
      ),
    );
  });
}
