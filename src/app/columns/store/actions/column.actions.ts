import { createAction, props } from '@ngrx/store';
import { EntityState, Update } from '@ngrx/entity';
import { Column, ColumnParams, ColumnSetUpdateParams } from '../../model/column.model';
import { Board } from '@boards/model/board.model';

export const loadColumns = createAction('[Columns] Load Columns', props<{ boardId: Board['_id'] }>());
export const loadColumnsSuccess = createAction('[Columns] Load Columns Success', props<{ columns: Column[] }>());

export const loadColumn = createAction(
  '[Column] Load Columns',
  props<{ boardId: Board['_id']; columnId: Column['_id'] }>(),
);
export const loadColumnSuccess = createAction('[Columns] Load Column Success', props<{ column: Column }>());

export const createColumn = createAction(
  '[Columns] Add Column',
  props<{ boardId: Board['_id']; column: ColumnParams }>(),
);
export const createColumnSuccess = createAction('[Columns] Add Column Success', props<{ column: Column }>());
export const createColumnFailure = createAction('[Columns] Add Column Failure', props<{ error: unknown }>());

export const updateColumn = createAction(
  '[Columns] Update Column',
  props<{ boardId: Board['_id']; columnId: Column['_id']; column: ColumnParams }>(),
);
export const updateColumnSuccess = createAction('[Columns] Update Column Success', props<{ column: Update<Column> }>());

export const updateColumnsSet = createAction(
  '[Columns] Update ColumnsSet',
  props<{ columnsParams: ColumnSetUpdateParams[] }>(),
);
export const updateColumnsSetSuccess = createAction(
  '[Columns] Update ColumnsSet Success',
  props<{ columns: Update<Column>[] }>(),
);
export const updateColumnsSetFailure = createAction(
  '[Columns] Update ColumnsSet Failure',
  props<{ error: unknown; columnsState: EntityState<Column> }>(),
);

export const deleteColumn = createAction(
  '[Columns] Delete Column',
  props<{ boardId: Board['_id']; columnId: Column['_id'] }>(),
);
export const deleteColumnSuccess = createAction('[Columns] Delete Column Success', props<{ id: Column['_id'] }>());
