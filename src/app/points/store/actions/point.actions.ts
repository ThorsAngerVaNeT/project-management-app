import { createAction, props } from '@ngrx/store';
import { Point } from '../../model/point.model';

export const loadPoints = createAction('[Point] Load Points');
export const loadPointsSuccess = createAction('[Point] Load Points Success', props<{ data: Point }>());
export const loadPointsFailure = createAction('[Point] Load Points Failure', props<{ error: unknown }>());
