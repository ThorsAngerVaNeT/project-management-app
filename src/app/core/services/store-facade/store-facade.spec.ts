import { TestBed } from '@angular/core/testing';

import { StoreFacade } from './store-facade';

describe('StoreFacade', () => {
  let facade: StoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    facade = TestBed.inject(StoreFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
