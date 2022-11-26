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

  // loadFilesSet$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(FileActions.loadFilesSet),
  //     switchMap(({ taskFileIds }) => this.filesService.getFilesSet(taskFileIds)),
  //     map((files) => FileActions.loadFilesSetSuccess({ files })),
  //   );
  // });

  // loadFilesByUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(FileActions.loadFilesByUser),
  //     switchMap(({ userId }) => this.filesService.getFilesByUser(userId)),
  //     map((files) => FileActions.loadFilesByUserSuccess({ files })),
  //   );
  // });

  loadFilesByTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesByTask),
      switchMap(({ taskId }) => this.filesService.getFilesByTask(taskId)),
      map((files) => FileActions.loadFilesByTaskSuccess({ files })),
    );
  });

  loadFilesByBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesByBoard),
      switchMap(({ boardId }) => this.filesService.getFilesByBoard(boardId)),
      map((files) => FileActions.loadFilesByBoardSuccess({ files })),
    );
  });

  addUploadedFileToState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.uploadFile, FileActions.deleteFileBeforeUpload),
      concatMap(({ fileParams }) => {
        return FileHelpers.fileToBase64(fileParams);
      }),
      map(({ boardId, taskId, file, filename, path }) =>
        FileActions.addFileToStoreBeforeUploadSuccess({
          fileToState: {
            _id: '',
            name: '',
            boardId,
            taskId: environment.BOARD_COVER_FILE_TASK_ID,
            path,
          },
          fileParams: { boardId, taskId, file, filename },
        }),
      ),
    );
  });

  uploadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.addFileToStoreBeforeUploadSuccess),
      concatMap(({ fileParams: { boardId, taskId, file, filename } }) =>
        this.filesService.uploadFile(boardId, taskId, file, filename).pipe(
          map((newFile) => FileActions.uploadFileSuccess({ file: newFile })),
          catchError((error) => of(FileActions.uploadFileFailure({ error }))),
        ),
      ),
    );
  });

  // deleteFile$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(FileActions.deleteFile),
  //     concatMap(({ id }) => this.filesService.deleteFile(id).pipe(map(() => FileActions.deleteFileSuccess({ id })))),
  //   );
  // });

  loadFilesByTaskAfterCreateBoardSuccess$ = createEffect(() => {
    const taskId = environment.BOARD_COVER_FILE_TASK_ID;
    return this.actions$.pipe(
      ofType(FileActions.uploadFileSuccess),
      filter(({ file }) => file.taskId === taskId),
      map(({ file }) => FileHelpers.getPreloadImage$(file)),
      map(() => BoardActions.preloadImagesCompleted()),
    );
  });

  uploadBoardCoverAfterCreateBoardSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createBoardSuccess),
      filter(({ file }) => !!file),
      map(({ board: { _id: boardId }, file }) =>
        FileActions.uploadFile({
          fileParams: {
            boardId,
            taskId: environment.BOARD_COVER_FILE_TASK_ID,
            file,
            filename: FileHelpers.generateBoardCoverFilename(boardId, file.name),
          },
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
          const fileParams = {
            boardId: `${boardId}`,
            taskId: environment.BOARD_COVER_FILE_TASK_ID,
            file,
            filename: FileHelpers.generateBoardCoverFilename(boardId, file.name),
          };

          return id ? FileActions.deleteFileBeforeUpload({ id, fileParams }) : FileActions.uploadFile({ fileParams });
        },
      ),
    );
  });

  deleteFileBeforeUpload$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.deleteFileBeforeUpload),
      concatMap(({ id: fileId }) =>
        this.filesService.deleteFile(fileId).pipe(
          map(({ _id: id }) => FileActions.deleteFileBeforeUploadSuccess({ id })),
          catchError((error) => of(FileActions.deleteFileBeforeUploadFailure({ error }))),
        ),
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
