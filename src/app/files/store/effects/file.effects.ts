import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FileActions from '../actions/file.actions';
import { FilesService } from '../../services/files.service';

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private filesService: FilesService) {}

  loadFilesSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesSet),
      concatMap(({ taskFileIds }) =>
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
      concatMap(({ userId }) =>
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
      concatMap(({ taskId }) =>
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
      concatMap(({ boardId }) =>
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
      concatMap(({ boardId, taskId, file }) =>
        this.filesService.uploadFile(boardId, taskId, file).pipe(
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
        this.filesService.getFilesByBoard(id).pipe(
          map(() => FileActions.deleteFileSuccess({ id })),
          catchError((error) => of(FileActions.deleteFileFailure({ error }))),
        ),
      ),
    );
  });
}
