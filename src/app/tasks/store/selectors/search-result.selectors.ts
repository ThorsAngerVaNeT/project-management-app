import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSearchResult from '../reducers/search-result.reducer';

export const selectSearchResultState = createFeatureSelector<fromSearchResult.SearchResult>(
  fromSearchResult.tasksFeatureKey,
);

export const selectAllSearchResults = createSelector(selectSearchResultState, fromSearchResult.selectAllSearchResults);

export const selectSearchResultIds = createSelector(selectSearchResultState, fromSearchResult.selectSearchResultIds);
