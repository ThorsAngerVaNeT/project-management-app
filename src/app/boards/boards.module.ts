import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './components/board/board.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { ColumnsModule } from '../columns/columns.module';

@NgModule({
  declarations: [MainPageComponent, BoardComponent, BoardAddComponent, BoardCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ColumnsModule,

    NzCardModule,
    NzPageHeaderModule,
    NzAvatarModule,
    NzListModule,
    NzBadgeModule,
    NzTagModule,

    NzFormModule,
    NzModalModule,
    NzSelectModule,
    NzUploadModule,
    NzInputNumberModule,
    NzDividerModule,
    NzCheckboxModule,
  ],
})
export class BoardsModule {}
