import { selectAllColumns } from './column.selectors';

describe('Column Selectors', () => {
  const initialState = {
    ids: [],
    entities: [],
  };

  it('should select the feature state', () => {
    const result = selectAllColumns.projector(initialState);

    expect(result).toEqual(initialState.entities);
  });
});
