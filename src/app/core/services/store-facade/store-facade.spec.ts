import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { StoreFacade } from './store-facade';

describe('StoreFacade', () => {
  let facade: StoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideMockStore()] });
    facade = TestBed.inject(StoreFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
