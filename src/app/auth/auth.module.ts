import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
