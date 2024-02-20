import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ColumnEffects } from './column.effects';

describe('ColumnEffects', () => {
  let actions$: Observable<Actions>;
  let effects: ColumnEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ColumnEffects, provideMockStore(), provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ColumnEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
