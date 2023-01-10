import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import * as TaskActions from '../actions/search-result.actions';
import { TasksService } from '../../services/tasks.service';
import { environment } from '@environments/environment';
import { SearchTypes } from '@core/enums/search-types.enums';

@Injectable()
export class SearchResultEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  searchTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.searchTask),
      map(({ searchString, searchType }) => ({ searchString: searchString.trim(), searchType })),
      debounceTime(environment.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap(({ searchString, searchType }) =>
        searchType === SearchTypes.byKeyWords
          ? this.tasksService.getTasksBySearchString(searchString)
          : this.tasksService.getTasksSet(searchString.split(' ')),
      ),
      map((searchResult) => TaskActions.searchTaskSuccess({ searchResult })),
    );
  });
}
