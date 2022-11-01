import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse): void {
    let errorMess = 'Unknown Error: ';

    if (error instanceof HttpErrorResponse) {
      errorMess = `${error.statusText}(${error.status}) ${error.message}`;
    } else {
      errorMess += error.message;
    }

    // todo alert from ng-zorro
    console.error(errorMess);
  }
}
