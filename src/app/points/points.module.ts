import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { PointEffects } from './store/effects/point.effects';
import { PointItemComponent } from './components/point-item/point-item.component';
import * as fromPoint from './store/reducers/point.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [PointItemComponent],
  imports: [
    EffectsModule.forFeature([PointEffects]),
    StoreModule.forFeature(fromPoint.pointFeatureKey, fromPoint.reducer),
  ],
  exports: [PointItemComponent],
})
export class PointsModule {}
