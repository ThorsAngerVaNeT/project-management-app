import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectCurrentTaskId } from '@tasks/store/selectors/task.selectors';
import * as fromPoint from '../reducers/point.reducer';

export const selectPointState = createFeatureSelector<fromPoint.PointsState>(fromPoint.pointFeatureKey);

export const selectAllPoints = createSelector(selectPointState, fromPoint.selectAllPoints);

export const selectPointsByCurrentTask = createSelector(selectCurrentTaskId, selectAllPoints, (taskId, points) =>
  points.filter((point) => point.taskId === taskId),
);
