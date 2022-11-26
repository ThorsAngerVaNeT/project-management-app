import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FileActions from '../actions/file.actions';
import { TaskFile } from '../../model/file.model';

export const filesFeatureKey = 'files';

export interface FilesState extends EntityState<TaskFile> {}

export const adapter: EntityAdapter<TaskFile> = createEntityAdapter<TaskFile>({
  selectId: (file: TaskFile) => file._id,
});

export const initialState: FilesState = adapter.getInitialState({
  ids: [],
  entities: [],
});

export const reducer = createReducer(
  initialState,
  on(
    FileActions.loadFilesSetSuccess,
    FileActions.loadFilesByUserSuccess,
    FileActions.loadFilesByTaskSuccess,
    FileActions.loadFilesByBoardSuccess,
    (state, { files }) => adapter.setAll(files, state),
  ),
  on(FileActions.addFileToStoreBeforeUploadSuccess, (state, { fileToState }) => adapter.addOne(fileToState, state)),
  on(FileActions.uploadFileSuccess, (state, { file }) => adapter.addOne(file, state)),
  on(FileActions.uploadFileSuccess, FileActions.uploadFileFailure, (state) => adapter.removeOne('', state)),
);

export const {
  selectIds: selectFileIds,
  selectEntities: selectFilesEntities,
  selectAll: selectAllFiles,
  selectTotal: selectFilesTotal,
} = adapter.getSelectors();
