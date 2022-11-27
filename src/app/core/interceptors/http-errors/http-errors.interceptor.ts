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
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { APIEndpoints } from '../../enums/api-endpoints.enum';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private storeFacade: StoreFacade, private router: Router, private notification: NzNotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(environment.RETRY_HTTP_COUNT),
      catchError((error) =>
        throwError(() => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case HttpStatusCode.Unauthorized:
                return new Error('login or password is incorrect');
              case HttpStatusCode.Forbidden:
                this.storeFacade.signOut();
                return error;
              case HttpStatusCode.Conflict:
                return error;
              default:
                break;
            }
          }
          if (!request.url.includes(APIEndpoints.auth)) {
            this.notification.create(
              'error',
              'Something went wrong...',
              `Please try later.
                ${error.message}`,
            );
          }
          return error;
        }),
      ),
    );
  }
}
