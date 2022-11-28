import { TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';

import { ErrorHandlerService } from './error-handler.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateModule } from '@ngx-translate/core';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, TranslateModule.forRoot()],
      providers: [NzNotificationService],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
