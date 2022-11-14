import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ColumnTask } from '../../model/task.model';
import * as TaskActions from '../actions/task.actions';

export const tasksFeatureKey = 'tasks';

export interface TasksState extends EntityState<ColumnTask> {}

export const adapter: EntityAdapter<ColumnTask> = createEntityAdapter<ColumnTask>({ selectId: (task) => task._id });

export const initialState: TasksState = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  on(TaskActions.loadTasksSetSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  on(TaskActions.loadTasksByUserSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  on(TaskActions.loadTasksByBoardSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  on(TaskActions.loadTasksBySearchStringSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  on(TaskActions.loadTaskSuccess, (state, { task }) => adapter.setOne(task, state)),
  on(TaskActions.createTaskSuccess, (state, { task }) => adapter.addOne(task, state)),
  on(TaskActions.updateTaskSuccess, (state, { task }) => adapter.updateOne(task, state)),
  on(TaskActions.updateTasksSetSuccess, (state, { tasks }) => adapter.updateMany(tasks, state)),
  on(TaskActions.deleteTask, (state, { taskId }) => adapter.removeOne(taskId, state)),
);

export const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTaskTotal,
} = adapter.getSelectors();
