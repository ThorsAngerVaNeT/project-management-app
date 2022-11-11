import { NgModule } from '@angular/core';

import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ColumnComponent],
  imports: [SharedModule],
  exports: [ColumnComponent],
})
export class ColumnsModule {}
