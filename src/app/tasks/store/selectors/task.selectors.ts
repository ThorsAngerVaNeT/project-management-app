import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from '../reducers/task.reducer';
import { selectBoardId } from '@core/store/selectors/router.selector';
import { ColumnTask } from '../../model/task.model';

export const selectTaskState = createFeatureSelector<fromTask.TasksState>(fromTask.tasksFeatureKey);

export const selectAllTasks = createSelector(selectTaskState, fromTask.selectAllTasks);

export const selectTasksOfCurrentBoardByColumns = createSelector(selectAllTasks, selectBoardId, (tasks, boardId) => {
  const groupedTasks: { [keyof: string]: ColumnTask[] } = {};
  const currentBoardTasks = tasks
    .filter((task) => task.boardId === boardId)
    .reduce((acc, cur) => {
      if (!acc[cur.columnId]) acc[cur.columnId] = [];
      acc[cur.columnId].push(cur);
      return acc;
    }, groupedTasks);

  return currentBoardTasks;
});
