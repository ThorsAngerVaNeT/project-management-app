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
  on(UserActions.loadUsersSuccess, (state, { users }) => adapter.setAll(users, state)),
  on(UserActions.createUserSuccess, (state, { user }) => adapter.addOne(user, state)),
  on(UserActions.updateUserSuccess, (state, { user }) => adapter.updateOne(user, state)),
  on(UserActions.deleteUserSuccess, (state, { id }) => adapter.removeOne(id, state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
