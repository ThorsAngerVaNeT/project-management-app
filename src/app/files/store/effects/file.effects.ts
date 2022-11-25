import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, filter, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import * as FileActions from '../actions/file.actions';
import { FilesService } from '../../services/files.service';
import { environment } from '@environments/environment';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import * as BoardActions from '@boards/store/actions/board.actions';
import * as FileHelpers from './file.helpers';

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
      map(({ file }) => {
        FileActions.loadFilesSet({ taskFileIds: [file._id] });
        return FileHelpers.getPreloadImage$(file);
      }),
      map(() => BoardActions.preloadImagesCompleted()),
    );
  });

  uploadBoardCoverAfterCreateBoardSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createBoardSuccess),
      filter(({ file }) => !!file),
      concatMap(({ board: { _id: boardId }, file }) => {
        return FileHelpers.fileToBase64(boardId, file);
      }),
      concatMap(({ boardId, file, path }) => [
        FileActions.addFileToStoreBeforeUploadSuccess({
          file: {
            _id: '',
            name: '',
            boardId,
            taskId: environment.BOARD_COVER_FILE_TASK_ID,
            path,
          },
        }),
        FileActions.uploadFile({
          boardId,
          taskId: environment.BOARD_COVER_FILE_TASK_ID,
          file,
          filename: FileHelpers.generateBoardCoverFilename(boardId, file.name),
        }),
      ]),
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
                filename: FileHelpers.generateBoardCoverFilename(boardId, file.name),
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
          filename: FileHelpers.generateBoardCoverFilename(boardId, file.name),
        }),
      ),
    );
  });

  preloadImagesAfterLoadFilesByTaskSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesByTaskSuccess),
      mergeMap(({ files }) => forkJoin(files.map((file) => FileHelpers.getPreloadImage$(file)))),
      concatMap(() => [BoardActions.preloadImagesCompleted(), BoardActions.loadMainPageDataSuccess()]),
    );
  });
}
