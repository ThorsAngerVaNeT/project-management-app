import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpStatusCode,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(environment.RETRY_HTTP_COUNT),
      catchError((error) =>
        throwError(() => {
          if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
            // todo refresh token, now just throw error
            return error;
          } else {
            return error;
          }
        }),
      ),
    );
  }
}
