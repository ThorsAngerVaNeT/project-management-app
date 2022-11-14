import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ColumnTask, ColumnTaskSetUpdateParams, ColumnTaskUpdateParams } from '../../model/task.model';
import { Board } from '../../../boards/models/board.model';
import { Column } from '../../../columns/models/column.model';
import { User } from '../../../users/models/user.model';

export const loadTasks = createAction(
  '[Tasks] Load Tasks',
  props<{ boardId: Board['_id']; columnId: Column['_id'] }>(),
);
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: ColumnTask[] }>());
export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure', props<{ error: unknown }>());

export const loadTasksSet = createAction('[Tasks] Load Tasks Set', props<{ ids: ColumnTask['_id'] }>());
export const loadTasksSetSuccess = createAction('[Tasks] Load Tasks Set Success', props<{ tasks: ColumnTask[] }>());
export const loadTasksSetFailure = createAction('[Tasks] Load Tasks Set Failure', props<{ error: unknown }>());

export const loadTasksByUser = createAction('[Tasks] Load Tasks By User', props<{ userId: User['_id'] }>());
export const loadTasksByUserSuccess = createAction(
  '[Tasks] Load Tasks By User Success',
  props<{ tasks: ColumnTask[] }>(),
);
export const loadTasksByUserFailure = createAction('[Tasks] Load Tasks By User Failure', props<{ error: unknown }>());

export const loadTasksByBoard = createAction('[Tasks] Load Tasks By Board', props<{ boardId: Board['_id'] }>());
export const loadTasksByBoardSuccess = createAction(
  '[Tasks] Load Tasks By Board Success',
  props<{ tasks: ColumnTask[] }>(),
);
export const loadTasksByBoardFailure = createAction('[Tasks] Load Tasks By Board Failure', props<{ error: unknown }>());

export const loadTasksBySearchString = createAction(
  '[Tasks] Load Tasks By SearchString',
  props<{ searchString: string }>(),
);
export const loadTasksBySearchStringSuccess = createAction(
  '[Tasks] Load Tasks By SearchString Success',
  props<{ tasks: ColumnTask[] }>(),
);
export const loadTasksBySearchStringFailure = createAction(
  '[Tasks] Load Tasks By SearchString Failure',
  props<{ error: unknown }>(),
);

export const loadTask = createAction(
  '[Tasks] Load Task',
  props<{ boardId: Board['_id']; columnId: Column['_id']; taskId: ColumnTask['_id'] }>(),
);
export const loadTaskSuccess = createAction('[Tasks] Load Task Success', props<{ task: ColumnTask }>());
export const loadTaskFailure = createAction('[Tasks] Load Task Failure', props<{ error: unknown }>());

export const createTask = createAction(
  '[Tasks] Add Task',
  props<{ boardId: Board['_id']; columnId: Column['_id']; task: ColumnTask }>(),
);
export const createTaskSuccess = createAction('[Tasks] Add Task Success', props<{ task: ColumnTask }>());
export const createTaskFailure = createAction('[Tasks] Add Task Failure', props<{ error: unknown }>());

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{
    boardId: Board['_id'];
    columnId: Column['_id'];
    taskId: ColumnTask['_id'];
    taskParams: ColumnTaskUpdateParams;
  }>(),
);
export const updateTaskSuccess = createAction('[Tasks] Update Task Success', props<{ task: Update<ColumnTask> }>());
export const updateTaskFailure = createAction('[Tasks] Update Task Failure', props<{ error: unknown }>());

export const updateTasksSet = createAction(
  '[Tasks] Update Tasks Set',
  props<{ tasksParams: ColumnTaskSetUpdateParams[] }>(),
);
export const updateTasksSetSuccess = createAction(
  '[Tasks] Update Tasks Success',
  props<{ tasks: Update<ColumnTask>[] }>(),
);
export const updateTasksSetFailure = createAction('[Tasks] Update Tasks Failure', props<{ error: unknown }>());

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ boardId: Board['_id']; columnId: Column['_id']; taskId: ColumnTask['_id'] }>(),
);
export const deleteTaskSuccess = createAction('[Tasks] Delete Task Success', props<{ taskId: ColumnTask['_id'] }>());
export const deleteTaskFailure = createAction('[Tasks] Delete Task Failure', props<{ error: unknown }>());
