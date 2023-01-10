import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

import { UserEffects } from './user.effects';
import { TranslateModule } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Overlay } from '@angular/cdk/overlay';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [UserEffects, provideMockStore(), provideMockActions(() => actions$), NzNotificationService, Overlay],
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
