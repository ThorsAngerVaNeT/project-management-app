import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(environment.retryHTTPCall),
      catchError((error) =>
        throwError(() => {
          if (error.status === 401) {
            // todo refresh token, now just throw error
            return new Error(error);
          } else {
            return new Error(error);
          }
        }),
      ),
    );
  }
}
