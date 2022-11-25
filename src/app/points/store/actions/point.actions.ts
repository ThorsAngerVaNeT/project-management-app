import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { TaskFile } from '@files/model/file.model';
import { User } from '@users/model/user.model';
import { Point, PointParams, PointsSetUpdateParams, PointUpdateParams } from '../../model/point.model';

export const loadPointsSet = createAction('[Point] Load PointsSet', props<{ ids: Point['_id'][] }>());
export const loadPointsSetSuccess = createAction('[Point] Load PointsSet Success', props<{ points: Point[] }>());

export const loadPointsByUser = createAction('[Point] Load Points By User', props<{ userId: User['_id'] }>());
export const loadPointsByUserSuccess = createAction(
  '[Point] Load Points By User Success',
  props<{ points: Point[] }>(),
);

export const loadPointsByTask = createAction('[Point] Load Points By Task', props<{ taskId: TaskFile['_id'] }>());
export const loadPointsByTaskSuccess = createAction(
  '[Point] Load Points By Task Success',
  props<{ points: Point[] }>(),
);

export const createPoint = createAction('[Point] Create Point', props<{ point: PointParams }>());
export const createPointSuccess = createAction('[Point] Create Point Success', props<{ point: Point }>());

export const updatePoint = createAction(
  '[Point] Update Point',
  props<{ pointId: Point['_id']; pointParams: PointUpdateParams }>(),
);
export const updatePointSuccess = createAction('[Point] Update Point Success', props<{ point: Update<Point> }>());

export const updatePointsSet = createAction(
  '[Point] Update Points Set',
  props<{ pointsParams: PointsSetUpdateParams[] }>(),
);
export const updatePointsSetSuccess = createAction(
  '[Point] Update Points Set Success',
  props<{ points: Update<Point>[] }>(),
);

export const deletePoint = createAction('[Point] Delete Point', props<{ pointId: Point['_id'] }>());
export const deletePointSuccess = createAction('[Point] Delete Point Success', props<{ pointId: Point['_id'] }>());

export const addNewTaskPoint = createAction(
  '[Point] Add New Task Point',
  props<{ newTaskPointId: Point['_id']; point: Point }>(),
);
export const updateNewTaskPoint = createAction(
  '[Point] Update New Task Point',
  props<{ newTaskPointId: Point['_id']; pointParams: PointUpdateParams }>(),
);
export const deleteNewTaskPoint = createAction(
  '[Point] Delete New Task Point',
  props<{ newTaskPointId: Point['_id'] }>(),
);
export const clearNewTaskPoint = createAction('[Point] Clear New Task Points');
