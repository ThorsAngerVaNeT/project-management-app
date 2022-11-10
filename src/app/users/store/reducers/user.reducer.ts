import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/user.model';
import * as UserActions from '../actions/user.actions';

export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user) => user._id,
});

export const initialState: UserState = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, action) => adapter.setAll(action.users, state)),
  on(UserActions.createUserSuccess, (state, action) => adapter.addOne(action.user, state)),
  on(UserActions.updateUserSuccess, (state, action) => adapter.updateOne(action.user, state)),
  on(UserActions.deleteUserSuccess, (state, action) => adapter.removeOne(action.id, state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
