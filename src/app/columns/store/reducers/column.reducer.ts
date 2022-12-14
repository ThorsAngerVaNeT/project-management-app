import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ColumnActions from '../actions/column.actions';
import { Column } from '../../model/column.model';

export const columnsFeatureKey = 'columns';

export interface ColumnsState extends EntityState<Column> {
  loading: boolean;
  cachedColumns: EntityState<Column>;
}

export const adapter: EntityAdapter<Column> = createEntityAdapter<Column>({
  selectId: (column: Column) => column._id,
});

export const initialState: ColumnsState = adapter.getInitialState({
  ids: [],
  entities: {},
  loading: false,
  cachedColumns: {
    ids: [],
    entities: {},
  },
});

export const reducer = createReducer(
  initialState,
  on(ColumnActions.loadColumnsSuccess, (state, { columns }) => adapter.setAll(columns, state)),
  on(ColumnActions.loadColumnSuccess, (state, { column }) => adapter.setOne(column, state)),
  on(ColumnActions.createColumn, (state): ColumnsState => ({ ...state, loading: true })),
  on(ColumnActions.createColumnSuccess, (state, { column }) => adapter.addOne(column, state)),
  on(ColumnActions.createColumnSuccess, (state): ColumnsState => ({ ...state, loading: false })),
  on(ColumnActions.createColumnFailure, (state): ColumnsState => ({ ...state, loading: false })),
  on(ColumnActions.updateColumnSuccess, (state, { column }) => adapter.updateOne(column, state)),

  on(ColumnActions.updateColumnsSet, (state, { columnsParams }) => {
    const columns = columnsParams.map(({ _id: id, ...changes }) => {
      const { _id, ...originalColumn } = { ...state.entities[id] };
      const column = { id, changes: { ...originalColumn, ...changes } };

      return column;
    });
    return adapter.updateMany(columns, {
      ...state,
      cachedColumns: { ids: state.ids.slice(), entities: { ...state.entities } },
    });
  }),
  on(ColumnActions.updateColumnsSetSuccess, (state, { columns }) => adapter.updateMany(columns, state)),
  on(
    ColumnActions.updateColumnsSetFailure,
    (state, { columnsState: { ids, entities } }): ColumnsState => ({ ...state, ids, entities }),
  ),

  on(ColumnActions.deleteColumnSuccess, (state, { id }) => adapter.removeOne(id, state)),
);

export const {
  selectIds: selectColumnIds,
  selectEntities: selectColumnEntities,
  selectAll: selectAllColumns,
  selectTotal: selectColumnTotal,
} = adapter.getSelectors();
