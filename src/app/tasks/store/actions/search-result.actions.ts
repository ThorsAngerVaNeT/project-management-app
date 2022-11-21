import { createAction, props } from '@ngrx/store';
import { ColumnTask } from '../../model/task.model';

export const searchTask = createAction('[Search Result] Search Task', props<{ searchString: string }>());
export const searchTaskSuccess = createAction(
  '[Search Result] Search Task Success',
  props<{ searchResult: ColumnTask[] }>(),
);
