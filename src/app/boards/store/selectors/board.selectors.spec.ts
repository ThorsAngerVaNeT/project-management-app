import { selectAllBoards } from './board.selectors';

describe('Board Selectors', () => {
  const initialState = {
    ids: [],
    entities: [],
  };

  it('should select the feature state', () => {
    const result = selectAllBoards.projector(initialState);

    expect(result).toEqual(initialState.entities);
  });
});
