import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as fromAuth from '@auth/store/actions/auth.actions';
import * as authSelectors from '@auth/store/selectors/auth.selectors';
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
import * as pointSelectors from '@points/store/selectors/point.selectors';
import { Point, PointParams, PointUpdateParams } from '@points/model/point.model';
import { selectBoardCovers, selectBoardCoverUrl, selectOldCoverId } from '@files/store/selectors/file.selectors';
import * as fromSearchResult from '@tasks/store/actions/search-result.actions';
import * as searchResultSelectors from '@tasks/store/selectors/search-result.selectors';
import jwt_decode from 'jwt-decode';
import * as fromLanguage from '../../store/actions/language.actions';
import { selectLocalizationValue } from '../../store/selectors/language.selectors';
import { Locales } from '../../store/reducers/language.reducer';
import { selectTaskIsLoading, selectCachedTasks } from '@tasks/store/selectors/task.selectors';
import { selectColumnIsLoading, selectCachedColumns } from '@columns/store/selectors/column.selectors';
import { selectBoardId } from '../../store/selectors/router.selector';
import * as fromRouter from '../../store/actions/router.action';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreFacade {
  user$ = this.store.select(authSelectors.selectUser);

  token$ = this.store.select(authSelectors.selectToken);

  boards$ = this.store.select(BoardSelectors.selectBoardsWithUsers);

  boardDetail$ = this.store.select(BoardSelectors.selectBoardDetailViewModel);

  users$ = this.store.select(selectAllUsers);

  userEntities$ = this.store.select(selectUsersEntities);

  points$ = this.store.select(pointSelectors.selectPointsByCurrentTask);

  newTaskPoints$ = this.store.select(pointSelectors.selectNewTaskAllPoints);

  pointsLoading$ = this.store.select(pointSelectors.selectPointsLoading);

  boardCovers$ = this.store.select(selectBoardCovers);

  boardsLoading$ = this.store.select(BoardSelectors.selectBoardsLoading);

  boardEntities$ = this.store.select(BoardSelectors.selectBoardEntities);

  cachedBoards$ = this.store.select(BoardSelectors.selectCachedBoards);

  boardsLoaded$ = this.store.select(BoardSelectors.selectBoardsLoaded);

  searchResult$ = this.store.select(searchResultSelectors.selectSearchResultsWithUsers);

  searchResultIsLoading$ = this.store.select(searchResultSelectors.selectSearchResultIsLoading);

  selectAuthViewModel$ = this.store.select(authSelectors.selectAuthViewModel);

  oldCoverId$ = this.store.select(selectOldCoverId);

  boardId$ = this.store.select(selectBoardId);

  isLoggedIn$ = this.token$.pipe(
    map((token) => {
      try {
        if (!token) {
          return false;
        }

        if (!environment.JWT_PATTERN.test(token)) {
          throw new Error('invalid token');
        }

        const { exp } = this.decodeToken(token);

        if (exp * 1000 <= Date.now()) {
          throw new Error('Token expired');
        }

        return true;
      } catch {
        this.clearUserState();
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

  getColumn(boardId: Board['_id'], columnId: Column['_id']): void {
    this.store.dispatch(fromColumn.loadColumn({ boardId, columnId }));
  }

  createColumn(boardId: Board['_id'], column: ColumnParams): void {
    this.store.dispatch(fromColumn.createColumn({ boardId, column }));
  }

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

  updateUser(userId: User['_id'], user: UserParams): void {
    this.store.dispatch(fromUser.updateUser({ userId, user }));
  }

  deleteUser(id: User['_id']): void {
    this.store.dispatch(fromUser.deleteUser({ id }));
  }

  getTasks(boardId: Board['_id'], columnId: Column['_id']): void {
    this.store.dispatch(fromTask.loadTasks({ boardId, columnId }));
  }

  getTasksByBoard(boardId: Board['_id']): void {
    this.store.dispatch(fromTask.loadTasksByBoard({ boardId }));
  }

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

  getFilesByTask(taskId: ColumnTask['_id']): void {
    this.store.dispatch(fromFile.loadFilesByTask({ taskId }));
  }

  getFilesByBoard(boardId: Board['_id']): void {
    this.store.dispatch(fromFile.loadFilesByBoard({ boardId }));
  }

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

  getBoardCovers(): void {
    this.getFilesByTask(environment.BOARD_COVER_FILE_TASK_ID);
  }

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

  clearUserState(): void {
    this.store.dispatch(fromAuth.clearUserState());
  }

  redirectToBoard(): void {
    this.store.dispatch(fromRouter.redirectToBoard());
  }

  redirectToRoot(): void {
    this.store.dispatch(fromRouter.redirectToRoot());
  }

  redirectToWelcome(): void {
    this.store.dispatch(fromRouter.redirectToWelcome());
  }

  clearErrorMessage(): void {
    this.store.dispatch(fromAuth.userCleanErrorMessage());
  }
}
