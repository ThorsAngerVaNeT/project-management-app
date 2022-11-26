import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ColumnTask } from '../../model/task.model';
import * as TaskActions from '../actions/task.actions';

export const tasksFeatureKey = 'tasks';

export interface TasksState extends EntityState<ColumnTask> {
  currentTaskId: ColumnTask['_id'];
  loading: boolean;
}

export const adapter: EntityAdapter<ColumnTask> = createEntityAdapter<ColumnTask>({ selectId: (task) => task._id });

export const initialState: TasksState = adapter.getInitialState({
  currentTaskId: '',
  loading: false,
});

export const reducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  // on(TaskActions.loadTasksSetSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  // on(TaskActions.loadTasksByUserSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  on(TaskActions.loadTasksByBoardSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  // on(TaskActions.loadTasksBySearchStringSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
  on(TaskActions.loadTaskSuccess, (state, { task }) => adapter.setOne(task, state)),
  on(TaskActions.createTask, (state): TasksState => ({ ...state, loading: true })),
  on(TaskActions.createTaskSuccess, (state, { task }) => adapter.addOne(task, state)),
  on(TaskActions.createTaskSuccess, (state): TasksState => ({ ...state, loading: false })),
  on(TaskActions.createTaskFailure, (state): TasksState => ({ ...state, loading: false })),
  on(TaskActions.updateTask, (state): TasksState => ({ ...state, loading: true })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => adapter.updateOne(task, state)),
  on(TaskActions.updateTaskSuccess, (state): TasksState => ({ ...state, loading: false })),
  on(TaskActions.updateTaskFailure, (state): TasksState => ({ ...state, loading: false })),
  on(TaskActions.updateTasksSet, (state, { tasksParams }) => {
    const tasks = tasksParams.map(({ _id: id, ...changes }) => {
      const { _id, ...originalTask } = { ...state.entities[id] };
      const task = { id, changes: { ...originalTask, ...changes } };

      return task;
    });
    return adapter.updateMany(tasks, state);
  }),
  on(TaskActions.deleteTask, (state, { taskId }) => adapter.removeOne(taskId, state)),
  on(TaskActions.selectTask, (state, { taskId }): TasksState => ({ ...state, currentTaskId: taskId })),
);

export const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTaskTotal,
} = adapter.getSelectors();
