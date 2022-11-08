import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { userGetInfo, userSignIn } from '../../../auth/store/actions/user.actions';
import { selectToken, selectUser } from '../../../auth/store/selectors/user.selectors';
import { BoardParams } from '../../../boards/models/board.model';
import * as fromBoard from '../../../boards/store/actions/board.actions';
import { selectAllBoards } from '../../../boards/store/selectors/board.selectors';
import { SignInParams } from '../../../users/models/user.model';

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

  updateBoard(id: string, board: BoardParams): void {
    this.store.dispatch(fromBoard.updateBoard({ id, board }));
  }

  createBoard(board: BoardParams): void {
    this.store.dispatch(fromBoard.createBoard({ board }));
  }

  deleteBoard(id: string): void {
    this.store.dispatch(fromBoard.deleteBoard({ id }));
  }
}
