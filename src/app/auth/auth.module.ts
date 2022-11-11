import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import AuthRoutingModule from './auth.route.module';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
