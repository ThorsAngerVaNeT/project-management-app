import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FooterComponent } from './components/footer/footer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const MODULES = [
  NzLayoutModule,
  NzInputModule,
  NzRadioModule,
  NzDropDownModule,
  NzIconModule,
  NzButtonModule,
  NzToolTipModule,
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ConfirmationComponent],
  imports: [...MODULES, CommonModule],
  exports: [...MODULES, CommonModule, FooterComponent, HeaderComponent],
})
export class SharedModule {}
