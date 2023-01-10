import { selectAllFiles } from './file.selectors';

describe('File Selectors', () => {
  const initialState = {
    ids: [],
    entities: [],
  };

  it('should select the feature state', () => {
    const result = selectAllFiles.projector(initialState);

    expect(result).toEqual(initialState.entities);
  });
});
