import { selectAllTasks } from './task.selectors';

describe('Task Selectors', () => {
  const initialState = {
    ids: [],
    entities: [],
  };
  it('should select the feature state', () => {
    const result = selectAllTasks.projector(initialState);

    expect(result).toEqual(initialState.entities);
  });
});
