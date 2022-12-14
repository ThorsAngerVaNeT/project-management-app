import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ColumnActions from '../actions/column.actions';
import { ColumnsService } from '../../services/columns.service';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Injectable()
export class ColumnEffects {
  constructor(private actions$: Actions, private columnsService: ColumnsService, private storeFacade: StoreFacade) {}

  loadColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.loadColumns),
      switchMap(({ boardId }) => this.columnsService.getColumns(boardId)),
      map((columns) => ColumnActions.loadColumnsSuccess({ columns })),
    );
  });

  loadColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.loadColumn),
      switchMap(({ boardId, columnId }) => this.columnsService.getColumn(boardId, columnId)),
      map((column) => ColumnActions.loadColumnSuccess({ column })),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.createColumn),
      concatMap(({ boardId, column: columnParams }) => this.columnsService.createColumn(boardId, columnParams)),
      map((column) => ColumnActions.createColumnSuccess({ column })),
      catchError((error) => of(ColumnActions.createColumnFailure({ error }))),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.updateColumn),
      concatMap(({ boardId, columnId, column: columnParams }) =>
        this.columnsService.updateColumn(boardId, columnId, columnParams),
      ),
      map(({ _id: id, ...changes }) => ColumnActions.updateColumnSuccess({ column: { id, changes } })),
    );
  });

  updateColumnsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.updateColumnsSet),
      concatLatestFrom(() => this.storeFacade.cachedColumns$),
      switchMap(([{ columnsParams }, columnsState]) =>
        this.columnsService.updateColumnsSet(columnsParams).pipe(
          map((columns) =>
            ColumnActions.updateColumnsSetSuccess({
              columns: columns.map(({ _id: id, ...changes }) => ({
                id,
                changes,
              })),
            }),
          ),
          catchError((error) => of(ColumnActions.updateColumnsSetFailure({ error, columnsState }))),
        ),
      ),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.deleteColumn),
      concatMap(({ boardId, columnId }) => this.columnsService.deleteColumn(boardId, columnId)),
      map(({ _id: id }) => ColumnActions.deleteColumnSuccess({ id })),
    );
  });
}
