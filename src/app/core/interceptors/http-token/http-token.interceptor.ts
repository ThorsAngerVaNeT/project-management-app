import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { Store } from '@ngrx/store';
import { selectToken } from '../../../auth/store/selectors/user.selectors';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectToken).pipe(
      first(),
      switchMap((token) => {
        if (!request.url.includes(APIEndpoints.auth)) {
          request = request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        }
        return next.handle(request);
      }),
    );
  }
}
