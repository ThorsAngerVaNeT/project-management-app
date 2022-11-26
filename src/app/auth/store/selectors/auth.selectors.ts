import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/auth.reducer';

export const selectUser = createFeatureSelector<UserState>('user');

export const selectToken = createSelector(selectUser, (state: UserState) => state.token);

export const selectAuthLoading = createSelector(selectUser, (state) => state.loading);

export const selectAuthError = createSelector(selectUser, (state) => state.error);
