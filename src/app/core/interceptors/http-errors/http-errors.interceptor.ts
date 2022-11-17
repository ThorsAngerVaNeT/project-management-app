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
import { StoreFacade } from '../../services/store-facade/store-facade';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private storeFacade: StoreFacade, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(environment.RETRY_HTTP_COUNT),
      catchError((error) =>
        throwError(() => {
          if (
            error instanceof HttpErrorResponse &&
            (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden)
          ) {
            this.storeFacade.signOut();
            this.router.navigateByUrl('/');
          } else {
            return error;
          }
        }),
      ),
    );
  }
}
