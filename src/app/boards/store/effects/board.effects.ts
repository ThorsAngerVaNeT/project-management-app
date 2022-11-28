import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as BoardActions from '../actions/board.actions';
import { BoardsService } from '../../services/boards.service';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import * as FileActions from '@files/store/actions/file.actions';
import * as UserActions from '@users/store/actions/user.actions';
import { environment } from '@environments/environment';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardsService: BoardsService, private storeFacade: StoreFacade) {}

  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      switchMap(() => this.boardsService.getBoards()),
      map((boards) => BoardActions.loadBoardsSuccess({ boards })),
    );
  });

  loadBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoard),
      switchMap(({ id }) => this.boardsService.getBoard(id)),
      map((board) => BoardActions.loadBoardSuccess({ board })),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createBoard),
      concatMap(({ board: { file, ...boardParams } }) =>
        this.boardsService.createBoard({ ...boardParams }).pipe(
          map((board) => BoardActions.createBoardSuccess({ board, file })),
          catchError((error) => of(BoardActions.createBoardFailure({ error }))),
        ),
      ),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      concatMap(({ boardId, board: { file, ...boardParams } }) =>
        this.boardsService.updateBoard(boardId, boardParams).pipe(
          map(({ _id: id, ...changes }) => BoardActions.updateBoardSuccess({ board: { id, changes }, file })),
          catchError((error) => of(BoardActions.updateBoardFailure({ error }))),
        ),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      concatLatestFrom(() => this.storeFacade.cachedBoards$),
      concatMap(([{ id }, boardsState]) =>
        this.boardsService.deleteBoard(id).pipe(
          map(() => BoardActions.deleteBoardSuccess({ id })),
          catchError((error) => {
            return of(BoardActions.deleteBoardFailure({ error, boardsState }));
          }),
        ),
      ),
    );
  });

  loadMainPageData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadMainPageData),
      concatMap(() => [
        BoardActions.loadBoards(),
        UserActions.loadUsers(),
        FileActions.loadFilesByTask({ taskId: environment.BOARD_COVER_FILE_TASK_ID }),
      ]),
    );
  });
}
