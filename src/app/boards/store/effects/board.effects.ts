import { Injectable } from '@angular/core';
import { map, concatMap, switchMap } from 'rxjs/operators';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as BoardActions from '../actions/board.actions';
import { BoardsService } from '../../services/boards.service';
import { StoreFacade } from '@core/services/store-facade/store-facade';

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

  loadBoardsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoardsSet),
      switchMap(({ ids }) => this.boardsService.getBoardsSet(ids)),
      map((boards) => BoardActions.loadBoardsSetSuccess({ boards })),
    );
  });

  loadBoardsByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoardsByUser),
      switchMap(({ userId }) => this.boardsService.getBoardsByUser(userId)),
      map((boards) => BoardActions.loadBoardsByUserSuccess({ boards })),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createBoard),
      concatLatestFrom(() => this.storeFacade.user$),
      concatMap(([action, { _id: owner }]) => this.boardsService.createBoard({ ...action.board, owner })),
      map((board) => BoardActions.createBoardSuccess({ board })),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      concatMap((action) => this.boardsService.updateBoard(`${action.id}`, action.board)),
      map(({ _id: id, ...changes }) => BoardActions.updateBoardSuccess({ board: { id, changes } })),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      concatMap(({ id }) => this.boardsService.deleteBoard(id)),
      map(({ _id: id }) => BoardActions.deleteBoardSuccess({ id })),
    );
  });
}
