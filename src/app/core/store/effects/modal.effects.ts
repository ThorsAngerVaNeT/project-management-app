import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as BoardActions from '@boards/store/actions/board.actions';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class ModalEffects {
  constructor(private actions$: Actions, private modalService: NzModalService) {}

  closeAllModals$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardActions.createBoardSuccess, BoardActions.updateBoardSuccess),
        tap(() => {
          this.modalService.closeAll();
        }),
      );
    },
    { dispatch: false },
  );
}
