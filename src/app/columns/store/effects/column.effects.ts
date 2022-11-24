import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ColumnActions from '../actions/column.actions';
import { ColumnsService } from '../../services/columns.service';

@Injectable()
export class ColumnEffects {
  constructor(private actions$: Actions, private columnsService: ColumnsService) {}

  loadColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.loadColumns),
      switchMap(({ boardId }) =>
        this.columnsService.getColumns(boardId).pipe(
          map((columns) => ColumnActions.loadColumnsSuccess({ columns })),
          catchError((error) => of(ColumnActions.loadColumnsFailure({ error }))),
        ),
      ),
    );
  });

  loadColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.loadColumn),
      switchMap(({ boardId, columnId }) =>
        this.columnsService.getColumn(boardId, columnId).pipe(
          map((column) => ColumnActions.loadColumnSuccess({ column })),
          catchError((error) => of(ColumnActions.loadColumnFailure({ error }))),
        ),
      ),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.createColumn),
      concatMap(({ boardId, column: columnParams }) =>
        this.columnsService.createColumn(boardId, columnParams).pipe(
          map((column) => ColumnActions.createColumnSuccess({ column })),
          catchError((error) => of(ColumnActions.createColumnFailure({ error }))),
        ),
      ),
    );
  });

  createColumnsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.createColumnsSet),
      concatMap(({ columns: columnsParams }) =>
        this.columnsService.createColumnsSet(columnsParams).pipe(
          map((columns) => ColumnActions.createColumnsSetSuccess({ columns })),
          catchError((error) => of(ColumnActions.createColumnsSetFailure({ error }))),
        ),
      ),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.updateColumn),
      concatMap(({ boardId, columnId, column: columnParams }) =>
        this.columnsService.updateColumn(boardId, columnId, columnParams).pipe(
          map(({ _id: id, ...changes }) => ColumnActions.updateColumnSuccess({ column: { id, changes } })),
          catchError((error) => of(ColumnActions.updateColumnFailure({ error }))),
        ),
      ),
    );
  });

  updateColumnsSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.updateColumnsSet),
      switchMap(({ columnsParams }) =>
        this.columnsService.updateColumnsSet(columnsParams).pipe(
          map((columns) =>
            ColumnActions.updateColumnsSetSuccess({
              columns: columns.map(({ _id: id, ...changes }) => ({
                id,
                changes,
              })),
            }),
          ),
          catchError((error) => of(ColumnActions.updateColumnsSetFailure({ error }))),
        ),
      ),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.deleteColumn),
      concatMap(({ boardId, columnId }) =>
        this.columnsService.deleteColumn(boardId, columnId).pipe(
          map(() => ColumnActions.deleteColumnSuccess({ id: columnId })),
          catchError((error) => of(ColumnActions.deleteColumnFailure({ error }))),
        ),
      ),
    );
  });
}
