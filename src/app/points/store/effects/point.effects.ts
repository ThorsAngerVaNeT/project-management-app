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

  loadPointsByTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPointsByTask),
      switchMap(({ taskId }) => this.pointsService.getPointsByTask(taskId)),
      map((points) => PointActions.loadPointsByTaskSuccess({ points })),
      catchError((error) => of(PointActions.loadPointsByTaskFailure({ error }))),
    );
  });

  createPoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.createPoint),
      concatMap(({ point: pointParams }) => this.pointsService.createPoint(pointParams)),
      map((point) => PointActions.createPointSuccess({ point })),
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
      concatMap(({ pointId, pointParams }) => this.pointsService.updatePoint(pointId, pointParams)),
      map(({ _id: id, ...changes }) => PointActions.updatePointSuccess({ point: { id, changes } })),
    );
  });

  deletePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.deletePoint),
      concatMap(({ pointId }) => this.pointsService.deletePoint(pointId)),
      map(({ _id: pointId }) => PointActions.deletePointSuccess({ pointId })),
    );
  });
}
