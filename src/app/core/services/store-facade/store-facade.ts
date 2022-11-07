import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { userGetInfo, userSignIn } from '../../../auth/store/actions/user.actions';
import { selectToken, selectUser } from '../../../auth/store/selectors/user.selectors';
import { loadBoards } from '../../../boards/store/actions/board.actions';
import { SignInParams } from '../../../users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StoreFacade {
  user$ = this.store.select(selectUser);

  token$ = this.store.select(selectToken);

  constructor(private store: Store) {}

  signIn(data: SignInParams): void {
    this.store.dispatch(userSignIn({ data }));
  }

  getUserInfo(): void {
    this.store.dispatch(userGetInfo());
  }

  getBoards(): void {
    this.store.dispatch(loadBoards());
  }
}
