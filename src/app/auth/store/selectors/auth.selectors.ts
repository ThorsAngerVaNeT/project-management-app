import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectUser = createFeatureSelector<AuthState>('user');

export const selectToken = createSelector(selectUser, (state: AuthState) => state.token);

export const selectAuthError = createSelector(selectUser, (state) => state.error);

export const selectAuthIsLoading = createSelector(selectUser, (state) => state.loading);

export const selectAuthViewModel = createSelector(selectAuthError, selectAuthIsLoading, (error, isLoading) => ({
  error,
  isLoading,
}));
