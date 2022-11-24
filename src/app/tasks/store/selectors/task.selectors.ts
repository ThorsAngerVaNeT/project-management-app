import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from '../reducers/task.reducer';
import { selectBoardId } from '@core/store/selectors/router.selector';
import { ColumnTaskWithUsers } from '../../model/task.model';
import { selectUsersEntities } from '@users/store/selectors/user.selectors';
import { EMPTY_USER } from '@users/store/reducers/user.reducer';

export const selectTaskState = createFeatureSelector<fromTask.TasksState>(fromTask.tasksFeatureKey);

export const selectAllTasks = createSelector(selectTaskState, fromTask.selectAllTasks);

export const selectTasksOfCurrentBoardByColumns = createSelector(
  selectAllTasks,
  selectBoardId,
  selectUsersEntities,
  (tasks, boardId, userEntities) => {
    const initialValue: { [keyof: string]: ColumnTaskWithUsers[] } = {};
    const currentBoardTasks = tasks
      .filter((task) => task.boardId === boardId)
      .reduce((accumulator, currentValue) => {
        if (!accumulator[currentValue.columnId]) accumulator[currentValue.columnId] = [];
        const user = userEntities[currentValue.userId] ?? EMPTY_USER;
        const users = currentValue.users.map((userId) => userEntities[userId] ?? EMPTY_USER);
        const task = { ...currentValue, user, users };
        accumulator[currentValue.columnId].push(task);
        return accumulator;
      }, initialValue);

    return currentBoardTasks;
  },
);

export const selectCurrentTaskId = createSelector(selectTaskState, (state) => state.currentTaskId);
