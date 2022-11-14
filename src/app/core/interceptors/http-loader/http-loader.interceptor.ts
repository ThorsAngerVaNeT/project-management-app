import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { LoaderService } from '../../services/loader/loader.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide();
      }),
    );
  }
}
