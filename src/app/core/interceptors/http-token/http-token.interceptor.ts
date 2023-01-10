import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { StoreFacade } from '../../services/store-facade/store-facade';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  token$ = this.storeFacade.token$;

  constructor(private storeFacade: StoreFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.token$.pipe(
      first(),
      switchMap((token) => {
        if (!request.url.includes(APIEndpoints.auth) && !request.url.includes('/assets/')) {
          request = request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        }
        return next.handle(request);
      }),
    );
  }
}
