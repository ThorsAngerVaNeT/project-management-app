import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromColumn from './store/reducers/column.reducer';
import { ColumnEffects } from './store/effects/column.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromColumn.columnsFeatureKey, fromColumn.reducer),
    EffectsModule.forFeature([ColumnEffects]),
  ],
})
export class ColumnsModule {}
