import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUser = createFeatureSelector<UserState>('user');

export const selectToken = createSelector(selectUser, (state: UserState) => state.token);
