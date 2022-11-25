import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectUsersEntities } from '@users/store/selectors/user.selectors';
import { EMPTY_USER } from '@users/store/reducers/user.reducer';
import { ColumnTaskWithUsers } from '../../model/task.model';
import * as fromSearchResult from '../reducers/search-result.reducer';

export const selectSearchResultState = createFeatureSelector<fromSearchResult.SearchResult>(
  fromSearchResult.tasksFeatureKey,
);

export const selectAllSearchResults = createSelector(selectSearchResultState, fromSearchResult.selectAllSearchResults);

export const selectSearchResultIds = createSelector(selectSearchResultState, fromSearchResult.selectSearchResultIds);

export const selectSearchResultsWithUsers = createSelector(
  selectAllSearchResults,
  selectUsersEntities,
  (tasks, userEntities) => {
    return tasks.map((task) => {
      const { userId, users: usersIds } = task;
      const user = userEntities[userId] ?? EMPTY_USER;
      const users = usersIds.map((usersId: string) => userEntities[usersId] ?? EMPTY_USER);

      const currentTasks: ColumnTaskWithUsers = {
        ...task,
        user,
        users,
        selected: false,
      };

      return currentTasks;
    });
  },
);
