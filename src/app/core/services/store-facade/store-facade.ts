import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
// import { environment } from '@environments/environment';
import * as fromAuth from '@auth/store/actions/auth.actions';
import { selectAuthError, selectAuthLoading, selectToken, selectUser } from '@auth/store/selectors/auth.selectors';
import { Board, BoardParamsWithImage } from '@boards/model/board.model';
import * as fromBoard from '@boards/store/actions/board.actions';
import * as fromUser from '@users/store/actions/user.actions';
import * as fromTask from '@tasks/store/actions/task.actions';
import { SignInParams, TokenPayload, User, UserParams } from '@users/model/user.model';
import * as BoardSelectors from '@boards/store/selectors/board.selectors';
import * as fromFile from '@files/store/actions/file.actions';
import * as fromColumn from '@columns/store/actions/column.actions';
import { Column, ColumnParams, ColumnSetUpdateParams } from '@columns/model/column.model';
import {
  ColumnTask,
  ColumnTaskParams,
  ColumnTaskSetUpdateParams,
  ColumnTaskUpdateParams,
} from '@tasks/model/task.model';
import { selectAllUsers, selectUsersEntities } from '@users/store/selectors/user.selectors';
import * as fromPoint from '@points/store/actions/point.actions';
import {
  selectNewTaskAllPoints,
  selectPointsByCurrentTask,
  selectPointsLoading,
} from '@points/store/selectors/point.selectors';
import { Point, PointParams, PointUpdateParams } from '@points/model/point.model';
import { selectBoardCovers, selectBoardCoverUrl, selectOldCoverId } from '@files/store/selectors/file.selectors';
import * as fromSearchResult from '@tasks/store/actions/search-result.actions';
import { selectSearchResultsWithUsers } from '@tasks/store/selectors/search-result.selectors';
import jwt_decode from 'jwt-decode';
import * as fromLanguage from '../../store/actions/language.actions';
import { selectLocalizationValue } from '../../store/selectors/language.selectors';
import { Locales } from '../../store/reducers/language.reducer';
import { selectTaskIsLoading, selectCachedTasks } from '@tasks/store/selectors/task.selectors';
import { selectColumnIsLoading, selectCachedColumns } from '@columns/store/selectors/column.selectors';
import { selectBoardId } from '../../store/selectors/router.selector';

@Injectable({
  providedIn: 'root',
})
export class StoreFacade {
  user$ = this.store.select(selectUser);

  token$ = this.store.select(selectToken);

  boards$ = this.store.select(BoardSelectors.selectBoardsWithUsers);

  boardDetail$ = this.store.select(BoardSelectors.selectBoardDetailViewModel);

  users$ = this.store.select(selectAllUsers);

  userEntities$ = this.store.select(selectUsersEntities);

  points$ = this.store.select(selectPointsByCurrentTask);

  newTaskPoints$ = this.store.select(selectNewTaskAllPoints);

  pointsLoading$ = this.store.select(selectPointsLoading);

  boardCovers$ = this.store.select(selectBoardCovers);

  boardsLoading$ = this.store.select(BoardSelectors.selectBoardsLoading);

  boardEntities$ = this.store.select(BoardSelectors.selectBoardEntities);

  cachedBoards$ = this.store.select(BoardSelectors.selectCachedBoards);

  boardsLoaded$ = this.store.select(BoardSelectors.selectBoardsLoaded);

  searchResult$ = this.store.select(selectSearchResultsWithUsers);

  authLoading$ = this.store.select(selectAuthLoading);

  authError$ = this.store.select(selectAuthError);

  oldCoverId$ = this.store.select(selectOldCoverId);

  boardId$ = this.store.select(selectBoardId);

  isLoggedIn$ = this.user$.pipe(
    map((user) => {
      try {
        if (!user?.token) {
          return false;
        }

        const { exp } = this.decodeToken(user.token);

        if (exp * 1000 <= Date.now()) {
          this.signOut();
          return false;
        }

        return true;
      } catch {
        this.signOut();
        return false;
      }
    }),
  );

  localizationValue$ = this.store.select(selectLocalizationValue);

  columnIsLoading$ = this.store.select(selectColumnIsLoading);

  taskIsLoading$ = this.store.select(selectTaskIsLoading);

  cachedColumns$ = this.store.select(selectCachedColumns);

  cachedTasks$ = this.store.select(selectCachedTasks);

  boardIsLoading$ = this.store.select(BoardSelectors.selectBoardIsLoading);

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

  getBoardAllData(boardId: Board['_id']): void {
    this.getBoard(boardId);
    this.getColumns(boardId);
    this.getTasksByBoard(boardId);
    this.getFilesByBoard(boardId);
  }

  getBoardsAllData(): void {
    this.store.dispatch(fromBoard.loadMainPageData());
  }

  // getBoardsSet(ids: Board['_id'][]): void {
  //   this.store.dispatch(fromBoard.loadBoardsSet({ ids }));
  // }

  // getBoardsByUser(userId: User['_id']): void {
  //   this.store.dispatch(fromBoard.loadBoardsByUser({ userId }));
  // }

  createBoard(board: BoardParamsWithImage): void {
    this.store.dispatch(fromBoard.createBoard({ board }));
  }

  updateBoard(boardId: Board['_id'], board: BoardParamsWithImage): void {
    this.store.dispatch(fromBoard.updateBoard({ boardId, board }));
  }

  deleteBoard(id: Board['_id']): void {
    this.store.dispatch(fromBoard.deleteBoard({ id }));
  }

  getColumns(boardId: Board['_id']): void {
    this.store.dispatch(fromColumn.loadColumns({ boardId }));
  }

  // getColumnsSet(columnId: Column['_id'][]): void {
  //   this.store.dispatch(fromColumn.loadColumnsSet({ columnId }));
  // }

  // getColumnsByUser(userId: User['_id']): void {
  //   this.store.dispatch(fromColumn.loadColumnsByUser({ userId }));
  // }

  getColumn(boardId: Board['_id'], columnId: Column['_id']): void {
    this.store.dispatch(fromColumn.loadColumn({ boardId, columnId }));
  }

  createColumn(boardId: Board['_id'], column: ColumnParams): void {
    this.store.dispatch(fromColumn.createColumn({ boardId, column }));
  }

  // createColumnsSet(columns: ColumnsSetParams[]): void {
  //   this.store.dispatch(fromColumn.createColumnsSet({ columns }));
  // }

  updateColumn(boardId: Board['_id'], columnId: Column['_id'], column: ColumnParams): void {
    this.store.dispatch(fromColumn.updateColumn({ boardId, columnId, column }));
  }

  updateColumnsSet(columnsParams: ColumnSetUpdateParams[]): void {
    this.store.dispatch(fromColumn.updateColumnsSet({ columnsParams }));
  }

  deleteColumn(boardId: Board['_id'], columnId: Column['_id']): void {
    this.store.dispatch(fromColumn.deleteColumn({ boardId, columnId }));
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

  updateUser(userId: User['_id'], user: UserParams): void {
    this.store.dispatch(fromUser.updateUser({ userId, user }));
  }

  deleteUser(id: User['_id']): void {
    this.store.dispatch(fromUser.deleteUser({ id }));
  }

  getTasks(boardId: Board['_id'], columnId: Column['_id']): void {
    this.store.dispatch(fromTask.loadTasks({ boardId, columnId }));
  }

  // getTasksSet(ids: ColumnTask['_id'][]): void {
  //   this.store.dispatch(fromTask.loadTasksSet({ ids }));
  // }

  // getTasksByUser(userId: User['_id']): void {
  //   this.store.dispatch(fromTask.loadTasksByUser({ userId }));
  // }

  getTasksByBoard(boardId: Board['_id']): void {
    this.store.dispatch(fromTask.loadTasksByBoard({ boardId }));
  }

  // getTasksBySearchString(searchString: string): void {
  //   this.store.dispatch(fromTask.loadTasksBySearchString({ searchString }));
  // }

  getTask(boardId: Board['_id'], columnId: Column['_id'], taskId: ColumnTask['_id']): void {
    this.store.dispatch(fromTask.loadTask({ boardId, columnId, taskId }));
  }

  createTask(
    boardId: Board['_id'],
    columnId: Column['_id'],
    taskParams: ColumnTaskParams,
    pointsParams: PointParams[] = [],
  ): void {
    this.store.dispatch(fromTask.createTask({ boardId, columnId, taskParams, pointsParams }));
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

  // getFilesSet(taskFileIds: TaskFile['_id'][]): void {
  //   this.store.dispatch(fromFile.loadFilesSet({ taskFileIds }));
  // }

  // getFilesByUser(userId: User['_id']): void {
  //   this.store.dispatch(fromFile.loadFilesByUser({ userId }));
  // }

  // getFilesByTask(taskId: ColumnTask['_id']): void {
  //   this.store.dispatch(fromFile.loadFilesByTask({ taskId }));
  // }

  getFilesByBoard(boardId: Board['_id']): void {
    this.store.dispatch(fromFile.loadFilesByBoard({ boardId }));
  }

  // deleteFile(id: TaskFile['_id']): void {
  //   this.store.dispatch(fromFile.deleteFile({ id }));
  // }

  // uploadFile(fileParams: UploadFileParams): void {
  //   this.store.dispatch(fromFile.uploadFile({ fileParams }));
  // }

  selectTask(taskId: ColumnTask['_id']): void {
    this.store.dispatch(fromTask.selectTask({ taskId }));
  }

  getPointsByTask(taskId: ColumnTask['_id']): void {
    this.store.dispatch(fromPoint.loadPointsByTask({ taskId }));
  }

  createPoint(point: PointParams): void {
    this.store.dispatch(fromPoint.createPoint({ point }));
  }

  updatePoint(pointId: Point['_id'], pointParams: PointUpdateParams): void {
    this.store.dispatch(fromPoint.updatePoint({ pointId, pointParams }));
  }

  deletePoint(pointId: Point['_id']): void {
    this.store.dispatch(fromPoint.deletePoint({ pointId }));
  }

  addNewTaskPoint(newTaskPointId: Point['_id'], point: Point): void {
    this.store.dispatch(fromPoint.addNewTaskPoint({ newTaskPointId, point }));
  }

  updateNewTaskPoint(newTaskPointId: Point['_id'], pointParams: PointUpdateParams): void {
    this.store.dispatch(fromPoint.updateNewTaskPoint({ newTaskPointId, pointParams }));
  }

  deleteNewTaskPoint(newTaskPointId: Point['_id']): void {
    this.store.dispatch(fromPoint.deleteNewTaskPoint({ newTaskPointId }));
  }

  clearNewTaskPoint(): void {
    this.store.dispatch(fromPoint.clearNewTaskPoint());
  }

  // getBoardCovers(): void {
  //   this.getFilesByTask(environment.BOARD_COVER_FILE_TASK_ID);
  // }

  getBoardCoverStream(boardId: Board['_id']): Observable<string> {
    return this.store.select(selectBoardCoverUrl(boardId));
  }

  completePreload(): void {
    this.store.dispatch(fromBoard.preloadImagesCompleted());
  }

  searchTask(searchString: string, searchType: string): void {
    this.store.dispatch(fromSearchResult.searchTask({ searchString, searchType }));
  }

  public decodeToken(token: string): TokenPayload {
    return jwt_decode<TokenPayload>(token);
  }

  initLocalization(): void {
    this.store.dispatch(fromLanguage.initLocalization());
  }

  changeLanguage(language: Locales): void {
    this.store.dispatch(fromLanguage.changeLanguage({ language }));
  }
}
