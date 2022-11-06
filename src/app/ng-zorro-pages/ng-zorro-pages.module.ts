import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { BoardsComponent } from './boards/boards.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [BoardsComponent, MainComponent, SignInComponent, SignupComponent],
  imports: [
    CommonModule,

    NzLayoutModule,
    NzDropDownModule,
    NzSwitchModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzTypographyModule,
    NzButtonModule,
    NzAvatarModule,
    NzListModule,
    NzToolTipModule,
    NzRadioModule,
    NzBadgeModule,

    NzFormModule,
    NzModalModule,
  ],
  exports: [BoardsComponent, MainComponent],
})
export class NgZorroPagesModule {}
