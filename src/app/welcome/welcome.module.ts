import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, SharedModule],
})
export class WelcomeModule {}
