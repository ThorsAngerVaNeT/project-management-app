import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FileActions from '../actions/file.actions';
import { FilesService } from '../../services/files.service';
import { environment } from '@environments/environment';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import * as BoardActions from '@boards/store/actions/board.actions';
import { Board } from '@boards/model/board.model';

const generateBoardCoverFilename = (boardId: Board['_id'] | number, filename: string): string =>
  `${boardId}-${Date.now()}.${filename.split('.').at(-1)}`;

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private filesService: FilesService, private storeFacade: StoreFacade) {}

  loadFilesSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesSet),
      switchMap(({ taskFileIds }) =>
        this.filesService.getFilesSet(taskFileIds).pipe(
          map((files) => FileActions.loadFilesSetSuccess({ files })),
          catchError((error) => of(FileActions.loadFilesSetFailure({ error }))),
        ),
      ),
    );
  });

  loadFilesByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesByUser),
      switchMap(({ userId }) =>
        this.filesService.getFilesByUser(userId).pipe(
          map((files) => FileActions.loadFilesByUserSuccess({ files })),
          catchError((error) => of(FileActions.loadFilesByUserFailure({ error }))),
        ),
      ),
    );
  });

  loadFilesByTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesByTask),
      switchMap(({ taskId }) =>
        this.filesService.getFilesByTask(taskId).pipe(
          map((files) => FileActions.loadFilesByTaskSuccess({ files })),
          catchError((error) => of(FileActions.loadFilesByTaskFailure({ error }))),
        ),
      ),
    );
  });

  loadFilesByBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesByBoard),
      switchMap(({ boardId }) =>
        this.filesService.getFilesByBoard(boardId).pipe(
          map((files) => FileActions.loadFilesByBoardSuccess({ files })),
          catchError((error) => of(FileActions.loadFilesByBoardFailure({ error }))),
        ),
      ),
    );
  });

  uploadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.uploadFile),
      concatMap(({ boardId, taskId, file, filename }) =>
        this.filesService.uploadFile(boardId, taskId, file, filename).pipe(
          map((newFile) => FileActions.uploadFileSuccess({ file: newFile })),
          catchError((error) => of(FileActions.uploadFileFailure({ error }))),
        ),
      ),
    );
  });

  deleteFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.deleteFile),
      concatMap(({ id }) =>
        this.filesService.deleteFile(id).pipe(
          map(() => FileActions.deleteFileSuccess({ id })),
          catchError((error) => of(FileActions.deleteFileFailure({ error }))),
        ),
      ),
    );
  });

  loadFilesByTaskAfterCreateBoardSuccess$ = createEffect(() => {
    const taskId = environment.BOARD_COVER_FILE_TASK_ID;
    return this.actions$.pipe(
      ofType(FileActions.uploadFileSuccess),
      filter(({ file }) => file.taskId === taskId),
      map(() => FileActions.loadFilesByTask({ taskId })),
    );
  });

  uploadBoardCoverAfterCreateBoardSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createBoardSuccess),
      filter(({ file }) => !!file),
      map(({ board: { _id: boardId }, file }) =>
        FileActions.uploadFile({
          boardId,
          taskId: environment.BOARD_COVER_FILE_TASK_ID,
          file,
          filename: generateBoardCoverFilename(boardId, file.name),
        }),
      ),
    );
  });

  deleteBoardCoverAfterUpdateBoardSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateBoardSuccess),
      filter(({ file }) => !!file),
      concatLatestFrom(() => this.storeFacade.boardCovers$),
      map(
        ([
          {
            board: { id: boardId },
            file,
          },
          covers,
        ]) => {
          const id = covers[boardId]?._id;
          return id
            ? FileActions.deleteFileBeforeUpload({ id, boardId: `${boardId}`, file })
            : FileActions.uploadFile({
                boardId: `${boardId}`,
                taskId: environment.BOARD_COVER_FILE_TASK_ID,
                file,
                filename: generateBoardCoverFilename(boardId, file.name),
              });
        },
      ),
    );
  });

  deleteFileBeforeUpload$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.deleteFileBeforeUpload),
      concatMap(({ id: fileId, boardId, file }) =>
        this.filesService.deleteFile(fileId).pipe(
          map(({ _id: id }) => FileActions.deleteFileBeforeUploadSuccess({ id, boardId, file })),
          catchError((error) => of(FileActions.deleteFileBeforeUploadFailure({ error }))),
        ),
      ),
    );
  });

  uploadBoardCoverAfterDeleteOldBoardCover$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.deleteFileBeforeUploadSuccess),
      map(({ boardId, file }) =>
        FileActions.uploadFile({
          boardId: `${boardId}`,
          taskId: environment.BOARD_COVER_FILE_TASK_ID,
          file,
          filename: generateBoardCoverFilename(boardId, file.name),
        }),
      ),
    );
  });
}
