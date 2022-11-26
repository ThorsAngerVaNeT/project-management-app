import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as PointActions from '../actions/point.actions';
import { PointsService } from '../../services/points.service';
import * as TaskActions from '@tasks/store/actions/task.actions';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Injectable()
export class PointEffects {
  constructor(private actions$: Actions, private pointsService: PointsService, private storeFacade: StoreFacade) {}

  loadPointsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPointsSet),
      switchMap(({ ids }) =>
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
      switchMap(({ userId }) =>
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
      switchMap(({ taskId }) =>
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

  createPointForLatestTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.createTaskSuccess),
      concatLatestFrom(() => this.storeFacade.newTaskPoints$),
      concatMap(
        ([
          {
            task: { _id: taskId },
          },
          newTaskPoints,
        ]) => [
          ...newTaskPoints.map(({ _id, ...pointParams }) =>
            PointActions.createPoint({ point: { ...pointParams, taskId } }),
          ),
          PointActions.clearNewTaskPoint(),
        ],
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

  deletePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.deletePoint),
      concatMap(({ pointId }) => this.pointsService.deletePoint(pointId)),
      map(({ _id: pointId }) => PointActions.deletePointSuccess({ pointId })),
      catchError((error) => of(PointActions.deletePointFailure({ error }))),
    );
  });
}
