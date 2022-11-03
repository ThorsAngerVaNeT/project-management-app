import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { HttpBaseInterceptor } from './interceptors/http-base/http-base.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-errors/http-errors.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpBaseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
