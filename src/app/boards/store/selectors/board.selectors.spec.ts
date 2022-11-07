import * as fromBoard from '../reducers/board.reducer';
import { selectBoardsState } from './board.selectors';

describe('Board Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBoardsState({
      [fromBoard.boardsFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
