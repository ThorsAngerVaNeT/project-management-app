import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/actions/user.actions';
import { selectToken, selectUser } from '@auth/store/selectors/user.selectors';
import { Board, BoardParams } from '@boards/models/board.model';
import * as fromBoard from '@boards/store/actions/board.actions';
import * as fromUser from '@users/store/actions/user.actions';
import * as fromTask from '@tasks/store/actions/task.actions';
import { SignInParams, User, UserParams } from '@users/models/user.model';
import { selectBoardsWithUsers } from '@boards/store/selectors/board.selectors';
import * as fromFile from '@files/store/actions/file.actions';
import { TaskFile } from '../../../files/model/file.model';
import {
  ColumnTask,
  ColumnTaskParams,
  ColumnTaskSetUpdateParams,
  ColumnTaskUpdateParams,
} from '../../../tasks/model/task.model';
import { Column } from '../../../columns/models/column.model';

@Injectable({
  providedIn: 'root',
})
export class StoreFacade {
  user$ = this.store.select(selectUser);

  token$ = this.store.select(selectToken);

  boards$ = this.store.select(selectBoardsWithUsers);

  constructor(private store: Store) {}

  signIn(data: SignInParams): void {
    this.store.dispatch(fromAuth.userSignIn({ data }));
  }

  signOut(): void {
    this.store.dispatch(fromAuth.userSignOut());
  }

  signUp(data: UserParams): void {
    this.store.dispatch(fromAuth.userSignUp({ data }));
  }

  getUserInfo(): void {
    this.store.dispatch(fromAuth.userGetInfo());
  }

  getBoards(): void {
    this.store.dispatch(fromBoard.loadBoards());
  }

  getBoard(id: Board['_id']): void {
    this.store.dispatch(fromBoard.loadBoard({ id }));
  }

  getBoardsSet(ids: Board['_id'][]): void {
    this.store.dispatch(fromBoard.loadBoardsSet({ ids }));
  }

  getBoardsByUser(userId: User['_id']): void {
    this.store.dispatch(fromBoard.loadBoardsByUser({ userId }));
  }

  createBoard(board: BoardParams): void {
    this.store.dispatch(fromBoard.createBoard({ board }));
  }

  updateBoard(id: Board['_id'], board: BoardParams): void {
    this.store.dispatch(fromBoard.updateBoard({ id, board }));
  }

  deleteBoard(id: Board['_id']): void {
    this.store.dispatch(fromBoard.deleteBoard({ id }));
  }

  getUsers(): void {
    this.store.dispatch(fromUser.loadUsers());
  }

  getUser(id: User['_id']): void {
    this.store.dispatch(fromUser.loadUser({ id }));
  }

  createUser(user: UserParams): void {
    this.store.dispatch(fromUser.createUser({ user }));
  }

  updateUser(id: User['_id'], user: UserParams): void {
    this.store.dispatch(fromUser.updateUser({ id, user }));
  }

  deleteUser(id: User['_id']): void {
    this.store.dispatch(fromUser.deleteUser({ id }));
  }

  getTasks(boardId: Board['_id'], columnId: Column['_id']): void {
    this.store.dispatch(fromTask.loadTasks({ boardId, columnId }));
  }

  getTasksSet(ids: ColumnTask['_id'][]): void {
    this.store.dispatch(fromTask.loadTasksSet({ ids }));
  }

  getTasksByUser(userId: User['_id']): void {
    this.store.dispatch(fromTask.loadTasksByUser({ userId }));
  }

  getTasksByBoard(boardId: Board['_id']): void {
    this.store.dispatch(fromTask.loadTasksByBoard({ boardId }));
  }

  getTasksBySearchString(searchString: string): void {
    this.store.dispatch(fromTask.loadTasksBySearchString({ searchString }));
  }

  getTask(boardId: Board['_id'], columnId: Column['_id'], taskId: ColumnTask['_id']): void {
    this.store.dispatch(fromTask.loadTask({ boardId, columnId, taskId }));
  }

  createTask(boardId: Board['_id'], columnId: Column['_id'], taskParams: ColumnTaskParams): void {
    this.store.dispatch(fromTask.createTask({ boardId, columnId, taskParams }));
  }

  updateTask(
    boardId: Board['_id'],
    columnId: Column['_id'],
    taskId: ColumnTask['_id'],
    taskParams: ColumnTaskUpdateParams,
  ): void {
    this.store.dispatch(fromTask.updateTask({ boardId, columnId, taskId, taskParams }));
  }

  updateTasksSet(tasksParams: ColumnTaskSetUpdateParams[]): void {
    this.store.dispatch(fromTask.updateTasksSet({ tasksParams }));
  }

  deleteTask(boardId: Board['_id'], columnId: Column['_id'], taskId: ColumnTask['_id']): void {
    this.store.dispatch(fromTask.deleteTask({ boardId, columnId, taskId }));
  }

  getFilesSet(taskFileIds: TaskFile['_id'][]): void {
    this.store.dispatch(fromFile.loadFilesSet({ taskFileIds }));
  }

  getFilesByUser(userId: User['_id']): void {
    this.store.dispatch(fromFile.loadFilesByUser({ userId }));
  }

  getFilesByTask(taskId: ColumnTask['_id']): void {
    this.store.dispatch(fromFile.loadFilesByTask({ taskId }));
  }

  getFilesByBoard(boardId: Board['_id']): void {
    this.store.dispatch(fromFile.loadFilesByBoard({ boardId }));
  }

  deleteFile(id: TaskFile['_id']): void {
    this.store.dispatch(fromFile.deleteFile({ id }));
  }

  uploadFile(boardId: Board['_id'], taskId: ColumnTask['_id'], file: File): void {
    this.store.dispatch(fromFile.uploadFile({ boardId, taskId, file }));
  }
}
