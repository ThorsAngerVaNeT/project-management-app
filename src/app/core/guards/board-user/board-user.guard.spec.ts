import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { BoardUserGuard } from './board-user.guard';

describe('BoardUserGuard', () => {
  let guard: BoardUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), NzNotificationService, Overlay],
      imports: [TranslateModule.forRoot()],
    });
    guard = TestBed.inject(BoardUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
