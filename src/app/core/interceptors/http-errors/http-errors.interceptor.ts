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
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private storeFacade: StoreFacade,
    private router: Router,
    private notification: NzNotificationService,
    private translateService: TranslateService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(environment.RETRY_HTTP_COUNT),
      catchError((error) =>
        throwError(() => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case HttpStatusCode.Unauthorized:
                return new Error(this.translateService.instant('errTextHttp401Error'));
              case HttpStatusCode.Forbidden:
                this.storeFacade.signOut();
                return error;
              case HttpStatusCode.Conflict:
                return new Error(this.translateService.instant('errTextHttp409Error'));
            }
          }
          if (!request.url.includes(APIEndpoints.auth)) {
            this.notification.create(
              'error',
              this.translateService.instant('errTitle'),
              `${this.translateService.instant('errTextHttpError')}.
              ${error.message}`,
            );
          }
          return error;
        }),
      ),
    );
  }
}
