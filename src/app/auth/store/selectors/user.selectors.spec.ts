import { UserState } from '../reducers/user.reducer';
import { selectToken } from './user.selectors';

describe('User Selectors', () => {
  const initialState: UserState = { _id: 'TestId', name: 'TestName', login: 'TestLogin', token: 'TestToken' };

  it('should select token from state', () => {
    const result = selectToken.projector(initialState);

    expect(result).toEqual(initialState.token);
  });
});
