import { createReducer, on } from '@ngrx/store';
import * as PointActions from '../actions/point.actions';

export const pointFeatureKey = 'point';

export interface PointsState {}

export const initialState: PointsState = {};

export const reducer = createReducer(
  initialState,

  on(PointActions.loadPoints, (state): PointsState => state),
  on(PointActions.loadPointsSuccess, (state, action): PointsState => ({ ...state, ...action })),
  on(PointActions.loadPointsFailure, (state, action): PointsState => ({ ...state, ...action })),
);
