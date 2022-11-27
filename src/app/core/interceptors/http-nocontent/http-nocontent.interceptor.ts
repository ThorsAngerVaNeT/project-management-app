import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpStatusCode,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class HttpNoContentInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((response) => {
        if (response instanceof HttpResponse && response.status === HttpStatusCode.NoContent) {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw new HttpErrorResponse({
            error: 'Not found',
            status: 500,
            statusText: 'Warning',
            url: response.url ?? '',
          });
        }
        return response;
      }),
    );
  }
}
