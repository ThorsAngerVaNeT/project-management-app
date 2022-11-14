import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TaskEffects } from './task.effects';

describe('TaskEffects', () => {
  let actions$: Observable<Action>;
  let effects: TaskEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(TaskEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
