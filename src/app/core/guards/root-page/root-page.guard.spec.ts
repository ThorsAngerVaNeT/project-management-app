import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { RootPageGuard } from './root-page.guard';

describe('RootPageGuard', () => {
  let guard: RootPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideMockStore()] });
    guard = TestBed.inject(RootPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
