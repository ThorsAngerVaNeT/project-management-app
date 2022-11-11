import { NgModule } from '@angular/core';

import { WelcomeComponent } from './components/welcome/welcome.component';

import WelcomeRoutingModule from './welcome.route.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [WelcomeRoutingModule],
})
export class WelcomeModule {}
