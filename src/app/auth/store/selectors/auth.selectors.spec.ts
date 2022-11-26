import { UserState } from '../reducers/auth.reducer';
import { selectToken } from './auth.selectors';

describe('User Selectors', () => {
  const initialState: UserState = {
    _id: 'TestId',
    name: 'TestName',
    login: 'TestLogin',
    token: 'TestToken',
    loading: false,
    error: '',
  };

  it('should select token from state', () => {
    const result = selectToken.projector(initialState);

    expect(result).toEqual(initialState.token);
  });
});
