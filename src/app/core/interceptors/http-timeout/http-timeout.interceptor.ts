import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '@environments/environment';

export const TIMEOUT = new HttpContextToken(() => environment.DEFAULT_HTTP_TIMEOUT);

@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(timeout(environment.DEFAULT_HTTP_TIMEOUT));
  }
}
