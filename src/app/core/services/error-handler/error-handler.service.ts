import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private notification: NzNotificationService, private translateService: TranslateService) {}

  handleError(error: Error | HttpErrorResponse): void {
    let errorMessage = 'Unknown Error: ';

    if (!(error instanceof HttpErrorResponse)) {
      errorMessage += error?.message;

      this.notification.create(
        'error',
        this.translateService.instant('errTitle'),
        `${this.translateService.instant('errTextHttpError')}.
        ${errorMessage}`,
      );
    }
  }
}
