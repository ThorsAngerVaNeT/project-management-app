import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FileActions from '../actions/file.actions';
import { TaskFile } from '../../model/file.model';

export const filesFeatureKey = 'files';

export interface FilesState extends EntityState<TaskFile> {}

export const adapter: EntityAdapter<TaskFile> = createEntityAdapter<TaskFile>();

export const initialState: FilesState = adapter.getInitialState({
  ids: [],
  entities: [],
});

export const reducer = createReducer(
  initialState,
  on(FileActions.loadFilesSetSuccess, (state, { files }) => adapter.setAll(files, state)),
  on(FileActions.loadFilesByUserSuccess, (state, { files }) => adapter.setAll(files, state)),
  on(FileActions.loadFilesByTaskSuccess, (state, { files }) => adapter.setAll(files, state)),
  on(FileActions.loadFilesByBoardSuccess, (state, { files }) => adapter.setAll(files, state)),
  on(FileActions.uploadFileSuccess, (state, { file }) => adapter.addOne(file, state)),
  on(FileActions.deleteFileSuccess, (state, { id }) => adapter.removeOne(id, state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
