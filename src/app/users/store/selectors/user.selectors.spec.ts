import { selectUsersEntities } from './user.selectors';

describe('User Selectors', () => {
  const initialState = {
    ids: [],
    entities: {},
  };

  it('should select the feature state', () => {
    const result = selectUsersEntities.projector(initialState);

    expect(result).toEqual(initialState.entities);
  });
});
