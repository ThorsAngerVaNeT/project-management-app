import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { WelcomeComponent } from './components/welcome/welcome.component';

import WelcomeRoutingModule from './welcome.route.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [WelcomeRoutingModule, SharedModule],
})
export class WelcomeModule {}
