import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootPageGuard } from '../core/guards/root-page/root-page.guard';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent, canActivate: [RootPageGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AuthRoutingModule {}
