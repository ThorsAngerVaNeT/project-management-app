import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as TaskActions from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => TaskActions.loadTasksSuccess({ data })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private actions$: Actions) {}
}
