import { NgModule } from '@angular/core';

import { ColumnComponent } from './components/column/column.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromColumn from './store/reducers/column.reducer';
import { ColumnEffects } from './store/effects/column.effects';
import { TasksModule } from '@tasks/tasks.module';
import { ColumnAddComponent } from './components/column-add/column-add.component';

@NgModule({
  declarations: [ColumnComponent, ColumnAddComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromColumn.columnsFeatureKey, fromColumn.reducer),
    EffectsModule.forFeature([ColumnEffects]),
    TasksModule,
  ],
  exports: [ColumnComponent],
})
export class ColumnsModule {}
