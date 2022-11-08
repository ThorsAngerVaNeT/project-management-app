import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardActions from '../actions/board.actions';
import { BoardsService } from '../../services/boards.service';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      concatMap(() =>
        this.boardsService.getBoards().pipe(
          map((data) => BoardActions.loadBoardsSuccess({ data })),
          catchError((error) => of(BoardActions.loadBoardsFailure({ error }))),
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

  constructor(private actions$: Actions, private boardsService: BoardsService) {}
}
