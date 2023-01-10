import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../reducers/router.reducer';

export const selectRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectBoardId = createSelector(selectRouter, (state): string => state.state.params['boardId']);
