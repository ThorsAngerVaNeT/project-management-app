import { createFeatureSelector } from '@ngrx/store';
import * as fromTask from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.State>(fromTask.taskFeatureKey);
