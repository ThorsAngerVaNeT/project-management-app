import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ColumnTask } from '../../model/task.model';
import * as TaskActions from '../actions/search-result.actions';

export const tasksFeatureKey = 'searchResult';

export interface SearchResult extends EntityState<ColumnTask> {
  loading: boolean;
}

export const adapter: EntityAdapter<ColumnTask> = createEntityAdapter<ColumnTask>({ selectId: (task) => task._id });

export const initialState: SearchResult = adapter.getInitialState({
  loading: false,
});

export const reducer = createReducer(
  initialState,
  on(TaskActions.searchTask, (state): SearchResult => ({ ...state, loading: true })),
  on(TaskActions.searchTaskSuccess, (state, { searchResult }) => adapter.setAll(searchResult, state)),
  on(TaskActions.searchTaskSuccess, (state): SearchResult => ({ ...state, loading: false })),
  on(TaskActions.searchTaskFailure, (state): SearchResult => ({ ...state, loading: false })),
  on(TaskActions.clearSearchTask, (): SearchResult => ({ ...initialState })),
);

export const {
  selectIds: selectSearchResultIds,
  selectEntities: selectSearchResultEntities,
  selectAll: selectAllSearchResults,
  selectTotal: selectSearchResultTotal,
} = adapter.getSelectors();
