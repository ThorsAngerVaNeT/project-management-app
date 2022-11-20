import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Column, ColumnParams, ColumnSetUpdateParams, ColumnsSetParams } from '../../model/column.model';
import { Board } from '@boards/model/board.model';
import { User } from '@users/model/user.model';

export const loadColumns = createAction('[Columns] Load Columns', props<{ boardId: Board['_id'] }>());
export const loadColumnsSuccess = createAction('[Columns] Load Columns Success', props<{ columns: Column[] }>());
export const loadColumnsFailure = createAction('[Columns] Load Columns Failure', props<{ error: unknown }>());

export const loadColumnsSet = createAction('[Columns] Load ColumnsSet', props<{ columnId: Column['_id'][] }>());
export const loadColumnsSetSuccess = createAction('[Columns] Load ColumnsSet Success', props<{ columns: Column[] }>());
export const loadColumnsSetFailure = createAction('[Columns] Load ColumnsSet Failure', props<{ error: unknown }>());

export const loadColumnsByUser = createAction('[Columns] Load ColumnsByUser', props<{ userId: User['_id'] }>());
export const loadColumnsByUserSuccess = createAction(
  '[Columns] Load ColumnsByUser Success',
  props<{ columns: Column[] }>(),
);
export const loadColumnsByUserFailure = createAction(
  '[Columns] Load ColumnsByUser Failure',
  props<{ error: unknown }>(),
);

export const loadColumn = createAction(
  '[Column] Load Columns',
  props<{ boardId: Board['_id']; columnId: Column['_id'] }>(),
);
export const loadColumnSuccess = createAction('[Columns] Load Column Success', props<{ column: Column }>());
export const loadColumnFailure = createAction('[Columns] Load Column Failure', props<{ error: unknown }>());

export const createColumn = createAction(
  '[Columns] Add Column',
  props<{ boardId: Board['_id']; column: ColumnParams }>(),
);
export const createColumnSuccess = createAction('[Columns] Add Column Success', props<{ column: Column }>());
export const createColumnFailure = createAction('[Columns] Add Column Failure', props<{ error: unknown }>());

export const createColumnsSet = createAction('[Columns] Add ColumnsSet', props<{ columns: ColumnsSetParams[] }>());
export const createColumnsSetSuccess = createAction('[Columns] Add ColumnsSet Success', props<{ columns: Column[] }>());
export const createColumnsSetFailure = createAction('[Columns] Add ColumnsSet Failure', props<{ error: unknown }>());

export const updateColumn = createAction(
  '[Columns] Update Column',
  props<{ boardId: Board['_id']; columnId: Column['_id']; column: ColumnParams }>(),
);
export const updateColumnSuccess = createAction('[Columns] Update Column Success', props<{ column: Update<Column> }>());
export const updateColumnFailure = createAction('[Columns] Update Column Failure', props<{ error: unknown }>());

export const updateColumnsSet = createAction(
  '[Columns] Update ColumnsSet',
  props<{ columns: ColumnSetUpdateParams[] }>(),
);
export const updateColumnsSetSuccess = createAction(
  '[Columns] Update ColumnsSet Success',
  props<{ columns: Update<Column>[] }>(),
);
export const updateColumnsSetFailure = createAction('[Columns] Update ColumnsSet Failure', props<{ error: unknown }>());

export const deleteColumn = createAction(
  '[Columns] Delete Column',
  props<{ boardId: Board['_id']; columnId: Column['_id'] }>(),
);
export const deleteColumnSuccess = createAction('[Columns] Delete Column Success', props<{ id: Column['_id'] }>());
export const deleteColumnFailure = createAction('[Columns] Delete Column Failure', props<{ error: unknown }>());
