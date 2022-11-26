import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Point } from '../../model/point.model';
import * as PointActions from '../actions/point.actions';

export const pointFeatureKey = 'point';

export interface PointsState extends EntityState<Point> {
  newTaskPoints: { [keyof: string]: Point };
  loading: boolean;
}

export const adapter: EntityAdapter<Point> = createEntityAdapter<Point>({
  selectId: (point: Point) => point._id,
});

export const initialState: PointsState = adapter.getInitialState({
  ids: [],
  entities: {},
  newTaskPoints: {},
  loading: false,
});

export const reducer = createReducer(
  initialState,

  on(PointActions.loadPointsSet, (state): PointsState => ({ ...state, loading: true })),
  on(PointActions.loadPointsByUser, (state): PointsState => ({ ...state, loading: true })),
  on(PointActions.loadPointsByTask, (state): PointsState => ({ ...state, loading: true })),
  on(PointActions.loadPointsSetSuccess, (state, { points }) => adapter.setAll(points, { ...state, loading: false })),
  on(PointActions.loadPointsByUserSuccess, (state, { points }) => adapter.setAll(points, { ...state, loading: false })),
  on(PointActions.loadPointsByTaskSuccess, (state, { points }) => adapter.setAll(points, { ...state, loading: false })),
  on(PointActions.loadPointsSetFailure, (state): PointsState => ({ ...state, loading: false })),
  on(PointActions.loadPointsByUserFailure, (state): PointsState => ({ ...state, loading: false })),
  on(PointActions.loadPointsByTaskFailure, (state): PointsState => ({ ...state, loading: false })),
  on(PointActions.createPointSuccess, (state, { point }) => adapter.addOne(point, state)),
  on(PointActions.updatePointSuccess, (state, { point }) => adapter.updateOne(point, state)),
  on(PointActions.updatePointsSetSuccess, (state, { points }) => adapter.updateMany(points, state)),
  on(PointActions.deletePointSuccess, (state, { pointId }) => adapter.removeOne(pointId, state)),
  on(
    PointActions.addNewTaskPoint,
    (state, { newTaskPointId, point }): PointsState => ({
      ...state,
      newTaskPoints: { ...state.newTaskPoints, [newTaskPointId]: point },
    }),
  ),
  on(
    PointActions.updateNewTaskPoint,
    (state, { newTaskPointId, pointParams }): PointsState => ({
      ...state,
      newTaskPoints: {
        ...state.newTaskPoints,
        [newTaskPointId]: { ...state.newTaskPoints[newTaskPointId], ...pointParams },
      },
    }),
  ),
  on(PointActions.deleteNewTaskPoint, (state, { newTaskPointId }): PointsState => {
    const { [newTaskPointId]: deleted, ...newTaskPoints } = state.newTaskPoints;

    return {
      ...state,
      newTaskPoints,
    };
  }),
  on(PointActions.clearNewTaskPoint, (state): PointsState => ({ ...state, newTaskPoints: {} })),
);

export const {
  selectIds: selectPointIds,
  selectEntities: selectPointEntities,
  selectAll: selectAllPoints,
  selectTotal: selectPointTotal,
} = adapter.getSelectors();
