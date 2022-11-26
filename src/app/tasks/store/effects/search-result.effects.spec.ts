import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SearchResultEffects } from './search-result.effects';

describe('TaskEffects', () => {
  let actions$: Observable<Action>;
  let effects: SearchResultEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchResultEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SearchResultEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
