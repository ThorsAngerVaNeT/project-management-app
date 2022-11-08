import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ColumnComponent],
  imports: [CommonModule, SharedModule, NzCardModule, NzListModule, NzBadgeModule],
  exports: [ColumnComponent],
})
export class ColumnsModule {}
