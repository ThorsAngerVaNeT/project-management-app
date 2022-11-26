import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectBoardId } from '@core/store/selectors/router.selector';
import * as fromColumn from '../reducers/column.reducer';
import { selectTasksOfCurrentBoardByColumns } from '@tasks/store/selectors/task.selectors';

export const selectColumnState = createFeatureSelector<fromColumn.ColumnsState>(fromColumn.columnsFeatureKey);

export const selectAllColumns = createSelector(selectColumnState, fromColumn.selectAllColumns);

export const selectColumnEntities = createSelector(selectColumnState, fromColumn.selectColumnEntities);

export const selectCurrentBoardColumns = createSelector(
  selectAllColumns,
  selectBoardId,
  selectTasksOfCurrentBoardByColumns,
  (columns, boardId, boardTasks) => {
    return columns
      .filter((column) => column.boardId === boardId)
      .map((column) => {
        const tasks = boardTasks[column._id] ?? [];

        return { ...column, tasks };
      });
  },
);

export const selectColumnIsLoading = createSelector(selectColumnState, (state) => state.loading);
