import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromColumn from '../reducers/column.reducer';

export const selectColumnState = createFeatureSelector<fromColumn.ColumnsState>(fromColumn.columnsFeatureKey);

export const selectAllColumns = createSelector(selectColumnState, fromColumn.selectAllColumns);
