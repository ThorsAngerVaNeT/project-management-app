import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersModule } from '@users/users.module';

import { WelcomeComponent } from './components/welcome/welcome.component';

import WelcomeRoutingModule from './welcome.route.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [WelcomeRoutingModule, UsersModule, SharedModule],
})
export class WelcomeModule {}
