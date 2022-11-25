import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, switchMap, filter } from 'rxjs/operators';
import * as FileActions from '../actions/file.actions';
import { FilesService } from '../../services/files.service';
import { environment } from '@environments/environment';

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private filesService: FilesService) {}

  loadFilesSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesSet),
      switchMap(({ taskFileIds }) => this.filesService.getFilesSet(taskFileIds)),
      map((files) => FileActions.loadFilesSetSuccess({ files })),
    );
  });

  loadFilesByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesByUser),
      switchMap(({ userId }) => this.filesService.getFilesByUser(userId)),
      map((files) => FileActions.loadFilesByUserSuccess({ files })),
    );
  });

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

  uploadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.uploadFile),
      concatMap(({ boardId, taskId, file, filename }) => this.filesService.uploadFile(boardId, taskId, file, filename)),
      map((newFile) => FileActions.uploadFileSuccess({ file: newFile })),
    );
  });

  deleteFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.deleteFile),
      concatMap(({ id }) => this.filesService.deleteFile(id)),
      map(({ _id: id }) => FileActions.deleteFileSuccess({ id })),
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
}
