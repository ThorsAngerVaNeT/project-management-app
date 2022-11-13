import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FileEffects } from './file.effects';

describe('FileEffects', () => {
  let actions$: Observable<Action>;
  let effects: FileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(FileEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
