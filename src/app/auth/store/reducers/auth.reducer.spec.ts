import { Action } from '@ngrx/store';
import { userReducer, initialState } from './auth.reducer';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = userReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
