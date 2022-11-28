import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserEffects, provideMockStore(), provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
