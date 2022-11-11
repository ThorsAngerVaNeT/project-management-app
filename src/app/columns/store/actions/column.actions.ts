import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Column, ColumnParams } from '../../models/columns.model';
import { Board } from '../../../boards/models/board.model';

export const loadColumns = createAction('[Columns] Load Columns', props<{ boardId: Board['_id'] }>());
export const loadColumnsSuccess = createAction('[Columns] Load Columns Success', props<{ columns: Column[] }>());
export const loadColumnsFailed = createAction('[Columns] Load Columns Failed', props<{ error: unknown }>());

export const createColumn = createAction('[Columns] Add Column', props<{ column: ColumnParams }>());
export const createColumnSuccess = createAction('[Columns] Add Column Success', props<{ column: Column }>());
export const createColumnFailed = createAction('[Columns] Add Column Failed', props<{ error: unknown }>());

export const updateColumn = createAction(
  '[Columns] Update Column',
  props<{ boardId: Board['_id']; columnId: Column['_id']; column: ColumnParams }>(),
);
export const updateColumnSuccess = createAction('[Columns] Update Column Success', props<{ column: Update<Column> }>());
export const updateColumnFailed = createAction('[Columns] Update Column Failed', props<{ error: unknown }>());

export const deleteColumn = createAction('[Columns] Delete Column', props<{ id: Column['_id'] }>());
export const deleteColumnSuccess = createAction('[Columns] Delete Column Success', props<{ id: Column['_id'] }>());
export const deleteColumnFailed = createAction('[Columns] Delete Column Failed', props<{ error: unknown }>());
