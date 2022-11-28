import { createAction, props } from '@ngrx/store';
import { ColumnTask } from '../../model/task.model';

export const searchTask = createAction(
  '[Search Result] Search Task',
  props<{ searchString: string; searchType: string }>(),
);
export const searchTaskSuccess = createAction(
  '[Search Result] Search Task Success',
  props<{ searchResult: ColumnTask[] }>(),
);
export const searchTaskFailure = createAction('[Search Result] Search Task Failure');
