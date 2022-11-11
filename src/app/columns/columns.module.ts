import { NgModule } from '@angular/core';

import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ColumnComponent],
  imports: [CoreModule, SharedModule],
  exports: [ColumnComponent],
})
export class ColumnsModule {}
