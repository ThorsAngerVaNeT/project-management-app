import { selectAllSearchResult } from './search-result.selectors';

describe('Search Result Selectors', () => {
  const initialState = {
    ids: [],
    entities: [],
  };
  it('should select the feature state', () => {
    const result = selectAllSearchResult.projector(initialState);

    expect(result).toEqual(initialState.entities);
  });
});
