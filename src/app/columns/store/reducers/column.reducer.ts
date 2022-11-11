import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ColumnActions from '../actions/column.actions';
import { Column } from '../../models/column.model';

export const columnsFeatureKey = 'columns';

export interface ColumnsState extends EntityState<Column> {}

export const adapter: EntityAdapter<Column> = createEntityAdapter<Column>({
  selectId: (column: Column) => column._id,
});

export const initialState: ColumnsState = adapter.getInitialState({
  ids: [],
  entities: {},
});

export const reducer = createReducer(
  initialState,
  on(ColumnActions.loadColumnsSuccess, (state, action) => adapter.setAll(action.columns, state)),
  on(ColumnActions.loadColumnSuccess, (state, action) => adapter.setOne(action.column, state)),
  on(ColumnActions.loadColumnsSetSuccess, (state, action) => adapter.setAll(action.columns, state)),
  on(ColumnActions.loadColumnsByUserSuccess, (state, action) => adapter.setAll(action.columns, state)),
  on(ColumnActions.createColumnSuccess, (state, action) => adapter.addOne(action.column, state)),
  on(ColumnActions.createColumnsSetSuccess, (state, action) => adapter.addMany(action.columns, state)),
  on(ColumnActions.updateColumnSuccess, (state, action) => adapter.updateOne(action.column, state)),
  on(ColumnActions.updateColumnsSetSuccess, (state, action) => adapter.updateMany(action.columns, state)),
  on(ColumnActions.deleteColumnSuccess, (state, action) => adapter.removeOne(action.id, state)),
);

export const {
  selectIds: selectColumnIds,
  selectEntities: selectColumnEntities,
  selectAll: selectAllColumns,
  selectTotal: selectColumnTotal,
} = adapter.getSelectors();
