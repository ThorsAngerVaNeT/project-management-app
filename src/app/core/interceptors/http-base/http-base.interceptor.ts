import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable()
export class HttpBaseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets/')) {
      request = request.clone({ url: `${environment.API_URL}${request.url}` });
    }

    return next.handle(request);
  }
}
