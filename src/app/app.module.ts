import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeModule } from './welcome/welcome.module';
import { SharedModule } from './shared/shared.module';
import { BoardsModule } from './boards/boards.module';
import { TaskModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './columns/columns.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    WelcomeModule,
    SharedModule,
    BoardsModule,
    TaskModule,
    AuthModule,
    ColumnsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
