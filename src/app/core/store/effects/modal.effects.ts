import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as BoardActions from '@boards/store/actions/board.actions';
import * as ColumnActions from '@columns/store/actions/column.actions';
import * as TaskActions from '@tasks/store/actions/task.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Injectable()
export class ModalEffects {
  constructor(private actions$: Actions, private modalService: NzModalService, private router: Router) {}

  closeAllModals$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          BoardActions.createBoardSuccess,
          BoardActions.updateBoardSuccess,
          ColumnActions.createColumnSuccess,
          TaskActions.createTaskSuccess,
          TaskActions.updateTaskSuccess,
        ),
        tap(() => {
          this.modalService.closeAll();
        }),
      );
    },
    { dispatch: false },
  );
}
