import { createAction, props } from '@ngrx/store';
import { EntityState, Update } from '@ngrx/entity';
import {
  ColumnTask,
  ColumnTaskParams,
  ColumnTaskSetUpdateParams,
  ColumnTaskUpdateParams,
} from '../../model/task.model';
import { Board } from '@boards/model/board.model';
import { Column } from '@columns/model/column.model';
import { PointParams } from '@points/model/point.model';

export const loadTasks = createAction(
  '[Tasks] Load Tasks',
  props<{ boardId: Board['_id']; columnId: Column['_id'] }>(),
);
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: ColumnTask[] }>());

export const loadTasksByBoard = createAction('[Tasks] Load Tasks By Board', props<{ boardId: Board['_id'] }>());
export const loadTasksByBoardSuccess = createAction(
  '[Tasks] Load Tasks By Board Success',
  props<{ tasks: ColumnTask[] }>(),
);

export const loadTask = createAction(
  '[Tasks] Load Task',
  props<{ boardId: Board['_id']; columnId: Column['_id']; taskId: ColumnTask['_id'] }>(),
);
export const loadTaskSuccess = createAction('[Tasks] Load Task Success', props<{ task: ColumnTask }>());

export const createTask = createAction(
  '[Tasks] Add Task',
  props<{
    boardId: Board['_id'];
    columnId: Column['_id'];
    taskParams: ColumnTaskParams;
    pointsParams: PointParams[];
  }>(),
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
  '[Tasks] Update TasksSet',
  props<{ tasksParams: ColumnTaskSetUpdateParams[] }>(),
);
export const updateTasksSetSuccess = createAction(
  '[Tasks] Update TasksSet Success',
  props<{ tasks: Update<ColumnTask>[] }>(),
);
export const updateTasksSetFailure = createAction(
  '[Columns] Update TasksSet Failure',
  props<{ error: unknown; tasksState: EntityState<ColumnTask> }>(),
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ boardId: Board['_id']; columnId: Column['_id']; taskId: ColumnTask['_id'] }>(),
);
export const deleteTaskSuccess = createAction('[Tasks] Delete Task Success', props<{ taskId: ColumnTask['_id'] }>());

export const selectTask = createAction('[Tasks] Select Task', props<{ taskId: ColumnTask['_id'] }>());
