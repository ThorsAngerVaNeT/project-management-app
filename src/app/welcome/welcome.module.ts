import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { WelcomeComponent } from './components/welcome/welcome.component';

import WelcomeRoutingModule from './welcome.route.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CoreModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
