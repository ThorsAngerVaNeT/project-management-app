import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouter } from '../../../core/store/selectors/router.selector';
import * as fromColumn from '../reducers/column.reducer';

export const selectColumnState = createFeatureSelector<fromColumn.ColumnsState>(fromColumn.columnsFeatureKey);

export const selectAllColumns = createSelector(selectColumnState, fromColumn.selectAllColumns);

export const selectColumnEntities = createSelector(selectColumnState, fromColumn.selectColumnEntities);

export const selectCurrentBoardColumns = createSelector(selectAllColumns, selectRouter, (columns, router) => {
  const { boardId } = router.state.params;
  return columns.filter((column) => column.boardId === boardId);
});
