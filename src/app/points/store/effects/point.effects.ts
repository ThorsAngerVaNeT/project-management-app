import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, switchMap } from 'rxjs/operators';
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
      switchMap(({ ids }) => this.pointsService.getPointsSet(ids)),
      map((points) => PointActions.loadPointsSetSuccess({ points })),
    );
  });

  loadPointsByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPointsByUser),
      switchMap(({ userId }) => this.pointsService.getPointsByUser(userId)),
      map((points) => PointActions.loadPointsByUserSuccess({ points })),
    );
  });

  loadPointsByTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.loadPointsByTask),
      switchMap(({ taskId }) => this.pointsService.getPointsByTask(taskId)),
      map((points) => PointActions.loadPointsByTaskSuccess({ points })),
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

  updatePointsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointActions.updatePointsSet),
      concatMap(({ pointsParams }) => this.pointsService.updatePointsSet(pointsParams)),
      map((points) =>
        PointActions.updatePointsSetSuccess({
          points: points.map(({ _id: id, ...changes }) => ({
            id,
            changes,
          })),
        }),
      ),
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
