import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFile from '../reducers/file.reducer';

export const selectFileState = createFeatureSelector<fromFile.FilesState>(fromFile.filesFeatureKey);

export const selectAllFiles = createSelector(selectFileState, fromFile.selectAllFiles);
