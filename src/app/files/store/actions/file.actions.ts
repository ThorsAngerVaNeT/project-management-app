import { createAction, props } from '@ngrx/store';
import { Board } from '@boards/model/board.model';
import { ColumnTask } from '@tasks/model/task.model';
// import { User } from '@users/model/user.model';
import { TaskFile } from '../../model/file.model';

// export const loadFilesSet = createAction('[Files] Load FilesSet', props<{ taskFileIds: TaskFile['_id'][] }>());
// export const loadFilesSetSuccess = createAction('[Files] Load FilesSet Success', props<{ files: TaskFile[] }>());

// export const loadFilesByUser = createAction('[Files] Load Files By User', props<{ userId: User['_id'] }>());
// export const loadFilesByUserSuccess = createAction(
//   '[Files] Load Files By User Success',
//   props<{ files: TaskFile[] }>(),
// );

export const loadFilesByTask = createAction('[Files] Load Files By Task', props<{ taskId: ColumnTask['_id'] }>());
export const loadFilesByTaskSuccess = createAction(
  '[Files] Load Files By Task Success',
  props<{ files: TaskFile[] }>(),
);

// export const loadFilesByBoard = createAction('[Files] Load Files By Board', props<{ boardId: Board['_id'] }>());
// export const loadFilesByBoardSuccess = createAction(
//   '[Files] Load Files By Board Success',
//   props<{ files: TaskFile[] }>(),
// );

export const uploadFile = createAction(
  '[Files] Add File',
  props<{ boardId: Board['_id']; taskId: ColumnTask['_id']; file: File; filename: string }>(),
);
export const uploadFileSuccess = createAction('[Files] Add File Success', props<{ file: TaskFile }>());

// export const deleteFile = createAction('[Files] Delete File', props<{ id: TaskFile['_id'] }>());
// export const deleteFileSuccess = createAction('[Files] Delete File Success', props<{ id: TaskFile['_id'] }>());
