import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.usersFeatureKey);

export const selectUsersEntities = createSelector(selectUserState, fromUser.selectUserEntities);
