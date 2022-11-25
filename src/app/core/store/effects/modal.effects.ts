import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { StoreFacade } from '../../services/store-facade/store-facade';
import * as BoardActions from '@boards/store/actions/board.actions';

@Injectable()
export class ModalEffects {
  constructor(private actions$: Actions, private storeFacade: StoreFacade) {}

  closeAllModals$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardActions.createBoardSuccess, BoardActions.updateBoardSuccess),
        tap(() => {
          this.storeFacade.closeAllModals();
        }),
      );
    },
    { dispatch: false },
  );
}
