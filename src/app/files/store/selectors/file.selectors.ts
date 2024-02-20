import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { Board } from '@boards/model/board.model';
import { TaskFile } from '../../model/file.model';
import * as fromFile from '../reducers/file.reducer';
import { environment } from '@environments/environment';
import { getFileUrl } from '../effects/file.helpers';

export const selectFileState = createFeatureSelector<fromFile.FilesState>(fromFile.filesFeatureKey);

export const selectAllFiles = createSelector(selectFileState, fromFile.selectAllFiles);

export const selectOldCoverId = createSelector(selectFileState, (state) => state.oldCoverId);

export const selectBoardCovers = createSelector(selectAllFiles, (files) => {
  const initialValue: { [keyof: Board['_id']]: TaskFile } = {};
  const taskId = environment.BOARD_COVER_FILE_TASK_ID;

  return files
    .filter((file) => file.taskId === taskId)
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue.boardId] = currentValue;
      return accumulator;
    }, initialValue);
});

export const selectBoardCoverUrl = (
  boardId: Board['_id'],
): MemoizedSelector<object, string, DefaultProjectorFn<string>> =>
  createSelector(selectBoardCovers, (covers) => {
    if (!Object.keys(covers).length || !covers[boardId]) {
      return environment.BOARD_COVER_DEFAULT_IMAGE_URL;
    }

    return covers[boardId].path.startsWith('data:image/') ? covers[boardId].path : getFileUrl(covers[boardId].path);
  });
