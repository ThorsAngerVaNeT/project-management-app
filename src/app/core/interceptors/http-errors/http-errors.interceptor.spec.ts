import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { HttpErrorInterceptor } from './http-errors.interceptor';

describe('HttpErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpErrorInterceptor, provideMockStore(), NzNotificationService, Overlay],
      imports: [TranslateModule.forRoot()],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
