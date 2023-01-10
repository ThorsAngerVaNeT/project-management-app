import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { TaskFile } from '@files/model/file.model';
import { Point, PointParams, PointUpdateParams } from '../../model/point.model';

export const loadPointsByTask = createAction('[Point] Load Points By Task', props<{ taskId: TaskFile['_id'] }>());
export const loadPointsByTaskSuccess = createAction(
  '[Point] Load Points By Task Success',
  props<{ points: Point[] }>(),
);
export const loadPointsByTaskFailure = createAction('[Point] Load Points By Task Failure', props<{ error: unknown }>());

export const createPoint = createAction('[Point] Create Point', props<{ point: PointParams }>());
export const createPointSuccess = createAction('[Point] Create Point Success', props<{ point: Point }>());

export const updatePoint = createAction(
  '[Point] Update Point',
  props<{ pointId: Point['_id']; pointParams: PointUpdateParams }>(),
);
export const updatePointSuccess = createAction('[Point] Update Point Success', props<{ point: Update<Point> }>());

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
