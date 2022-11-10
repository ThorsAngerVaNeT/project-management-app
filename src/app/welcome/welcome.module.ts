import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import WelcomeRoutingModule from './welcome.route.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, SharedModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
