import { selectAllPoints } from './point.selectors';

describe('Point Selectors', () => {
  const initialState = {
    ids: [],
    entities: [],
  };

  it('should select the feature state', () => {
    const result = selectAllPoints.projector(initialState);

    expect(result).toEqual(initialState.entities);
  });
});
