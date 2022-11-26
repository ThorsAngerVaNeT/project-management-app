import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import '@angular/localize/init';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private modalService: NzModalService, private ngZone: NgZone) {}

  handleError(error: Error | HttpErrorResponse): void {
    let errorMessage = 'Unknown Error: ';

    if (error instanceof HttpErrorResponse) {
      errorMessage = `${error.statusText}(${error.status}) ${error.message}`;
    } else {
      errorMessage += error.message;
    }

    console.log(errorMessage);
  }
}
