import * as fromTask from '../reducers/task.reducer';
import { selectTaskState } from './task.selectors';

describe('Task Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTaskState({
      [fromTask.taskFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
