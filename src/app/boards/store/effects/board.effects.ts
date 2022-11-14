import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardActions from '../actions/board.actions';
import { BoardsService } from '../../services/boards.service';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardsService: BoardsService) {}

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
      concatMap((action) =>
        this.boardsService.createBoard(action.board).pipe(
          map((board) => BoardActions.createBoardSuccess({ board })),
          catchError((error) => of(BoardActions.createBoardFailure({ error }))),
        ),
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
