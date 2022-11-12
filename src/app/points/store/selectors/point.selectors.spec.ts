import * as fromPoint from '../reducers/point.reducer';
import { selectPointState } from './point.selectors';

describe('Point Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPointState({
      [fromPoint.pointFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
