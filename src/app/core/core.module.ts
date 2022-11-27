import { ErrorHandler, NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { HttpBaseInterceptor } from './interceptors/http-base/http-base.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-errors/http-errors.interceptor';
import { HttpTokenInterceptor } from './interceptors/http-token/http-token.interceptor';
import { HttpNoContentInterceptor } from './interceptors/http-nocontent/http-nocontent.interceptor';
import { HttpTimeoutInterceptor } from './interceptors/http-timeout/http-timeout.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { AuthModule } from '@auth/auth.module';
import { RouterSerializer } from './store/reducers/router.reducer';
import { CommonModule } from '@angular/common';
import { ModalEffects } from './store/effects/modal.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }, {}),
    EffectsModule.forRoot([ModalEffects]),
    StoreRouterConnectingModule.forRoot({ serializer: RouterSerializer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AuthModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpBaseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTimeoutInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpNoContentInterceptor, multi: true },
  ],
})
export class CoreModule {}
