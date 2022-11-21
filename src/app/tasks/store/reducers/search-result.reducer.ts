import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ColumnTask } from '../../model/task.model';
import * as TaskActions from '../actions/search-result.actions';

export const tasksFeatureKey = 'searchResult';

export interface SearchResult extends EntityState<ColumnTask> {}

export const adapter: EntityAdapter<ColumnTask> = createEntityAdapter<ColumnTask>({ selectId: (task) => task._id });

export const initialState: SearchResult = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(TaskActions.searchTaskSuccess, (state, { searchResult }) => adapter.setAll(searchResult, state)),
);

export const {
  selectIds: selectSearchResultIds,
  selectEntities: selectSearchResultEntities,
  selectAll: selectAllSearchResults,
  selectTotal: selectSearchResultTotal,
} = adapter.getSelectors();
