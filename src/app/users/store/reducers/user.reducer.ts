import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../model/user.model';
import * as UserActions from '../actions/user.actions';

export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user) => user._id,
});

export const initialState: UserState = adapter.getInitialState({});

export const EMPTY_USER: User = {
  _id: '',
  login: '',
  name: '',
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => adapter.setAll(users, state)),
  on(UserActions.updateUserSuccess, (state, { user }) => adapter.updateOne(user, state)),
  on(UserActions.deleteUserSuccess, (state, { id }) => adapter.removeOne(id, state)),
);

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal,
} = adapter.getSelectors();
