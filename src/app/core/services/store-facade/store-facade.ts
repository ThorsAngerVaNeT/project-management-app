import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { userGetInfo, userSignIn } from '../../../auth/store/actions/user.actions';
import { selectToken, selectUser } from '../../../auth/store/selectors/user.selectors';
import { BoardParams } from '../../../boards/models/board.model';
import * as fromBoard from '../../../boards/store/actions/board.actions';
import * as fromUser from '../../../users/store/actions/user.actions';
import { selectAllBoards } from '../../../boards/store/selectors/board.selectors';
import { SignInParams, UserParams } from '../../../users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StoreFacade {
  user$ = this.store.select(selectUser);

  token$ = this.store.select(selectToken);

  boards$ = this.store.select(selectAllBoards);

  constructor(private store: Store) {}

  signIn(data: SignInParams): void {
    this.store.dispatch(userSignIn({ data }));
  }

  getUserInfo(): void {
    this.store.dispatch(userGetInfo());
  }

  getBoards(): void {
    this.store.dispatch(fromBoard.loadBoards());
  }

  getBoard(id: string): void {
    this.store.dispatch(fromBoard.loadBoard({ id }));
  }

  getBoardsSet(ids: string[]): void {
    this.store.dispatch(fromBoard.loadBoardsSet({ ids }));
  }

  getBoardsByUser(userId: string): void {
    this.store.dispatch(fromBoard.loadBoardsByUser({ userId }));
  }

  createBoard(board: BoardParams): void {
    this.store.dispatch(fromBoard.createBoard({ board }));
  }

  updateBoard(id: string, board: BoardParams): void {
    this.store.dispatch(fromBoard.updateBoard({ id, board }));
  }

  deleteBoard(id: string): void {
    this.store.dispatch(fromBoard.deleteBoard({ id }));
  }

  getUsers(): void {
    this.store.dispatch(fromUser.loadUsers());
  }

  getUser(id: string): void {
    this.store.dispatch(fromUser.loadUser({ id }));
  }

  createUser(user: UserParams): void {
    this.store.dispatch(fromUser.createUser({ user }));
  }

  updateUser(id: string, user: UserParams): void {
    this.store.dispatch(fromUser.updateUser({ id, user }));
  }

  deleteUser(id: string): void {
    this.store.dispatch(fromUser.deleteUser({ id }));
  }
}
