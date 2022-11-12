import { Action } from '@ngrx/store';
import { reducer, initialState } from './point.reducer';

describe('Point Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
