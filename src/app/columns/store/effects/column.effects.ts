import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ColumnActions from '../actions/column.actions';
import { ColumnsService } from '../../services/columns.service';

@Injectable()
export class ColumnEffects {
  constructor(private actions$: Actions, private columnsService: ColumnsService) {}

  loadColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.loadColumns),
      concatMap(({ boardId }) =>
        this.columnsService.getColumns(boardId).pipe(
          map((columns) => ColumnActions.loadColumnsSuccess({ columns })),
          catchError((error) => of(ColumnActions.loadColumnsFailed({ error }))),
        ),
      ),
    );
  });
}
