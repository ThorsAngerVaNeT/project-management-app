import { createAction, props } from '@ngrx/store';
import { ColumnTask } from '../../model/task.model';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ data: ColumnTask[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: unknown }>());
