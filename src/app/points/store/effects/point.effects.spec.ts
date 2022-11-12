import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PointEffects } from './point.effects';

describe('PointEffects', () => {
  let actions$: Observable<Action>;
  let effects: PointEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PointEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PointEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
