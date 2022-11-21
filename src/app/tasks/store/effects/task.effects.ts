import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TaskActions from '../actions/task.actions';
import { TasksService } from '../../services/tasks.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(({ boardId, columnId }) =>
        this.tasksService.getTasks(boardId, columnId).pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error }))),
        ),
      ),
    );
  });

  loadTasksSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasksSet),
      switchMap(({ ids }) =>
        this.tasksService.getTasksSet(ids).pipe(
          map((tasks) => TaskActions.loadTasksSetSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksSetFailure({ error }))),
        ),
      ),
    );
  });

  loadTasksByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasksByUser),
      switchMap(({ userId }) =>
        this.tasksService.getTasksByUser(userId).pipe(
          map((tasks) => TaskActions.loadTasksByUserSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksByUserFailure({ error }))),
        ),
      ),
    );
  });

  loadTasksByBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasksByBoard),
      switchMap(({ boardId }) =>
        this.tasksService.getTasksByBoard(boardId).pipe(
          map((tasks) => TaskActions.loadTasksByBoardSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksByBoardFailure({ error }))),
        ),
      ),
    );
  });

  loadTasksBySearchString$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasksBySearchString),
      switchMap(({ searchString }) =>
        this.tasksService.getTasksBySearchString(searchString).pipe(
          map((tasks) => TaskActions.loadTasksBySearchStringSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksBySearchStringFailure({ error }))),
        ),
      ),
    );
  });

  loadTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTask),
      switchMap(({ boardId, columnId, taskId }) =>
        this.tasksService.getTask(boardId, columnId, taskId).pipe(
          map((task) => TaskActions.loadTaskSuccess({ task })),
          catchError((error) => of(TaskActions.loadTaskFailure({ error }))),
        ),
      ),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.createTask),
      concatMap(({ boardId, columnId, taskParams, pointsParams }) =>
        this.tasksService.createTask(boardId, columnId, taskParams).pipe(
          map((task) => TaskActions.createTaskSuccess({ task, pointsParams })),
          catchError((error) => of(TaskActions.createTaskFailure({ error }))),
        ),
      ),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      concatMap(({ boardId, columnId, taskId, taskParams }) =>
        this.tasksService.updateTask(boardId, columnId, taskId, taskParams).pipe(
          map(({ _id: id, ...changes }) => TaskActions.updateTaskSuccess({ task: { id, changes } })),
          catchError((error) => of(TaskActions.updateTaskFailure({ error }))),
        ),
      ),
    );
  });

  updateTasksSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTasksSet),
      concatMap(({ tasksParams }) =>
        this.tasksService.updateTasksSet(tasksParams).pipe(
          map((tasks) =>
            TaskActions.updateTasksSetSuccess({
              tasks: tasks.map(({ _id: id, ...changes }) => ({
                id,
                changes,
              })),
            }),
          ),
          catchError((error) => of(TaskActions.updateTasksSetFailure({ error }))),
        ),
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      concatMap(({ boardId, columnId, taskId }) =>
        this.tasksService.deleteTask(boardId, columnId, taskId).pipe(
          map(() => TaskActions.deleteTaskSuccess({ taskId })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error }))),
        ),
      ),
    );
  });
}
