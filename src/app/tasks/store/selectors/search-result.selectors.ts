import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSearchResult from '../reducers/search-result.reducer';

export const selectSearchResultState = createFeatureSelector<fromSearchResult.SearchResult>(
  fromSearchResult.tasksFeatureKey,
);

export const selectAllSearchResult = createSelector(selectSearchResultState, fromSearchResult.selectAllTasks);
