import { reducer, initialState } from './user.reducer';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = { type: '[App] User Sign In', data: { login: '' } };

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
