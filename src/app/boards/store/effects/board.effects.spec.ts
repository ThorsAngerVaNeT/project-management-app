import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BoardEffects } from './board.effects';
import { provideMockStore } from '@ngrx/store/testing';

describe('BoardEffects', () => {
  let actions$: Observable<Action>;
  let effects: BoardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardEffects, provideMockStore(), provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(BoardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
