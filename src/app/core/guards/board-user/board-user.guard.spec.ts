import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BoardUserGuard } from './board-user.guard';

describe('BoardUserGuard', () => {
  let guard: BoardUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideMockStore()] });
    guard = TestBed.inject(BoardUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
