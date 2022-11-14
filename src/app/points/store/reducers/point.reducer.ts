import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Point } from '../../model/point.model';
import * as PointActions from '../actions/point.actions';

export const pointFeatureKey = 'point';

export interface PointsState extends EntityState<Point> {}

export const adapter: EntityAdapter<Point> = createEntityAdapter<Point>({
  selectId: (point: Point) => point._id,
});

export const initialState: PointsState = adapter.getInitialState({
  ids: [],
  entities: {},
});

export const reducer = createReducer(
  initialState,

  on(PointActions.loadPointsSetSuccess, (state, { points }) => adapter.setAll(points, state)),
  on(PointActions.loadPointsByUserSuccess, (state, { points }) => adapter.setAll(points, state)),
  on(PointActions.loadPointsByTaskSuccess, (state, { points }) => adapter.setAll(points, state)),
  on(PointActions.createPointSuccess, (state, { point }) => adapter.addOne(point, state)),
  on(PointActions.updatePointSuccess, (state, { point }) => adapter.updateOne(point, state)),
  on(PointActions.updatePointsSetSuccess, (state, { points }) => adapter.updateMany(points, state)),
  on(PointActions.deletePointSuccess, (state, { pointId }) => adapter.removeOne(pointId, state)),
);

export const {
  selectIds: selectPointIds,
  selectEntities: selectPointEntities,
  selectAll: selectAllPoints,
  selectTotal: selectPointTotal,
} = adapter.getSelectors();
