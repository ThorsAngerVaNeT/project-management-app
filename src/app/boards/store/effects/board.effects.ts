import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BoardActions from '../actions/board.actions';
import { BoardsService } from '../../services/boards.service';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      concatMap(() =>
        this.boardsService.getBoards().pipe(
          map((data) => {
            console.log('data: ', data);
            return BoardActions.loadBoardsSuccess({ data });
          }),
          catchError((error) => of(BoardActions.loadBoardsFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private actions$: Actions, private boardsService: BoardsService) {}
}
