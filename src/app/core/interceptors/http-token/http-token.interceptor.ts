import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  // todo get token from store
  private token = localStorage.getItem('ngPMA.token');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes(APIEndpoints.auth)) {
      const clonedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` },
      });

      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
