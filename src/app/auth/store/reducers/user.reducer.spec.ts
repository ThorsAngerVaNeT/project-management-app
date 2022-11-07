import { userSignIn } from '../actions/user.actions';
import { userReducer, initialState } from './user.reducer';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = userSignIn({ data: { login: '', password: '' } });

      const result = userReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
