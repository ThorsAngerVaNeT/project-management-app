import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ColumnComponent],
  imports: [CommonModule, SharedModule],
  exports: [ColumnComponent],
})
export class ColumnsModule {}
