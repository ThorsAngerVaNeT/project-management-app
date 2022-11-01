import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { BoardsComponent } from './boards/boards.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [BoardsComponent, MainComponent],
  imports: [
    CommonModule,

    NzLayoutModule,
    NzDropDownModule,
    NzSwitchModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzSkeletonModule,
    NzTypographyModule,
    NzButtonModule,
    NzAvatarModule,
    NzListModule,
    NzToolTipModule,
    NzRadioModule,
    NzBadgeModule,
  ],
  exports: [BoardsComponent, MainComponent],
})
export class NgZorroPagesModule {}
