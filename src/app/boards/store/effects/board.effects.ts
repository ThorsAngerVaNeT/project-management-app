import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, concatMap, switchMap, filter } from 'rxjs/operators';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { environment } from '@environments/environment';
import * as BoardActions from '../actions/board.actions';
import { BoardsService } from '../../services/boards.service';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { uploadFile } from '@files/store/actions/file.actions';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardsService: BoardsService, private storeFacade: StoreFacade) {}

  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      switchMap(() =>
        this.boardsService.getBoards().pipe(
          map((boards) => BoardActions.loadBoardsSuccess({ boards })),
          catchError((error) => of(BoardActions.loadBoardsFailure({ error }))),
        ),
      ),
    );
  });

  loadBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoard),
      switchMap(({ id }) =>
        this.boardsService.getBoard(id).pipe(
          map((board) => BoardActions.loadBoardSuccess({ board })),
          catchError((error) => of(BoardActions.loadBoardFailure({ error }))),
        ),
      ),
    );
  });

  loadBoardsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoardsSet),
      switchMap(({ ids }) =>
        this.boardsService.getBoardsSet(ids).pipe(
          map((boards) => BoardActions.loadBoardsSetSuccess({ boards })),
          catchError((error) => of(BoardActions.loadBoardsSetFailure({ error }))),
        ),
      ),
    );
  });

  loadBoardsByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoardsByUser),
      switchMap(({ userId }) =>
        this.boardsService.getBoardsByUser(userId).pipe(
          map((boards) => BoardActions.loadBoardsByUserSuccess({ boards })),
          catchError((error) => of(BoardActions.loadBoardsByUserFailure({ error }))),
        ),
      ),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createBoard),
      concatLatestFrom(() => this.storeFacade.user$),
      concatMap(
        ([
          {
            board: { file, ...boardParams },
          },
          { _id: owner },
        ]) =>
          this.boardsService.createBoard({ ...boardParams, owner }).pipe(
            map((board) => BoardActions.createBoardSuccess({ board, file })),
            catchError((error) => of(BoardActions.createBoardFailure({ error }))),
          ),
      ),
    );
  });

  uploadBoardCoverAfterCreateBoardSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createBoardSuccess),
      filter(({ file }) => !!file),
      map(({ board: { _id: boardId }, file }) =>
        uploadFile({
          boardId,
          taskId: environment.BOARD_COVER_FILE_TASK_ID,
          file,
          filename: `${boardId}.${file.name.split('.').at(-1)}`,
        }),
      ),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      concatMap((action) =>
        this.boardsService.updateBoard(`${action.id}`, action.board).pipe(
          map(({ _id: id, ...changes }) => BoardActions.updateBoardSuccess({ board: { id, changes } })),
          catchError((error) => of(BoardActions.updateBoardFailure({ error }))),
        ),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      concatMap(({ id }) =>
        this.boardsService.deleteBoard(id).pipe(
          map(() => BoardActions.deleteBoardSuccess({ id })),
          catchError((error) => of(BoardActions.deleteBoardFailure({ error }))),
        ),
      ),
    );
  });
}
