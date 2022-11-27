import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
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
