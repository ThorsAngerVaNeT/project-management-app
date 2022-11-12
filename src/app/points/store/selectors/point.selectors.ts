import { createFeatureSelector } from '@ngrx/store';
import * as fromPoint from '../reducers/point.reducer';

export const selectPointState = createFeatureSelector<fromPoint.PointsState>(fromPoint.pointFeatureKey);
