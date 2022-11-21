import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import * as TaskActions from '../actions/search-result.actions';
import { TasksService } from '../../services/tasks.service';
import { environment } from '@environments/environment';

@Injectable()
export class SearchResultEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  searchTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.searchTask),
      map(({ searchString }) => searchString.trim()),
      debounceTime(environment.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap((searchString) => this.tasksService.getTasksBySearchString(searchString)),
      map((searchResult) => TaskActions.searchTaskSuccess({ searchResult })),
    );
  });
}
