import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse): void {
    // todo alert from ng-zorro
    console.error(error);
  }
}
