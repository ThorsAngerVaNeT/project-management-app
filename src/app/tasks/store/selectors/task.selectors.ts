import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.TasksState>(fromTask.tasksFeatureKey);

export const selectAllTasks = createSelector(selectTaskState, fromTask.selectAllTasks);
