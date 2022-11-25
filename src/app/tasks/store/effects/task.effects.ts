import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { TasksService } from '../../services/tasks.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(({ boardId, columnId }) => this.tasksService.getTasks(boardId, columnId)),
      map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
    );
  });

  // loadTasksSet$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TaskActions.loadTasksSet),
  //     switchMap(({ ids }) => this.tasksService.getTasksSet(ids)),
  //     map((tasks) => TaskActions.loadTasksSetSuccess({ tasks })),
  //   );
  // });

  // loadTasksByUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TaskActions.loadTasksByUser),
  //     switchMap(({ userId }) => this.tasksService.getTasksByUser(userId)),
  //     map((tasks) => TaskActions.loadTasksByUserSuccess({ tasks })),
  //   );
  // });

  loadTasksByBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasksByBoard),
      switchMap(({ boardId }) => this.tasksService.getTasksByBoard(boardId)),
      map((tasks) => TaskActions.loadTasksByBoardSuccess({ tasks })),
    );
  });

  // loadTasksBySearchString$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TaskActions.loadTasksBySearchString),
  //     switchMap(({ searchString }) => this.tasksService.getTasksBySearchString(searchString)),
  //     map((tasks) => TaskActions.loadTasksBySearchStringSuccess({ tasks })),
  //   );
  // });

  loadTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTask),
      switchMap(({ boardId, columnId, taskId }) => this.tasksService.getTask(boardId, columnId, taskId)),
      map((task) => TaskActions.loadTaskSuccess({ task })),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.createTask),
      concatMap(({ boardId, columnId, taskParams }) => this.tasksService.createTask(boardId, columnId, taskParams)),
      map((task) => TaskActions.createTaskSuccess({ task })),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      concatMap(({ boardId, columnId, taskId, taskParams }) =>
        this.tasksService.updateTask(boardId, columnId, taskId, taskParams),
      ),
      map(({ _id: id, ...changes }) => TaskActions.updateTaskSuccess({ task: { id, changes } })),
    );
  });

  updateTasksSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTasksSet),
      concatMap(({ tasksParams }) => this.tasksService.updateTasksSet(tasksParams)),
      map((tasks) =>
        TaskActions.updateTasksSetSuccess({
          tasks: tasks.map(({ _id: id, ...changes }) => ({
            id,
            changes,
          })),
        }),
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      concatMap(({ boardId, columnId, taskId }) => this.tasksService.deleteTask(boardId, columnId, taskId)),
      map(({ _id: taskId }) => TaskActions.deleteTaskSuccess({ taskId })),
    );
  });
}
