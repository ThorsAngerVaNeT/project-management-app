import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  // todo get token from store
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjE5YzE3YjA3ZDJjYjM3MDliYmVjMSIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njc1MDAxNjMsImV4cCI6MTY2NzU0MzM2M30.anPaLNOjxiVsW0Ce17AiX7P4T-izMlEpvdvz9ig0vvs';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(APIEndpoints.users)) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`),
      });

      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
