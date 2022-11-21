import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { PointEffects } from './store/effects/point.effects';
import * as fromPoint from './store/reducers/point.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    EffectsModule.forFeature([PointEffects]),
    StoreModule.forFeature(fromPoint.pointFeatureKey, fromPoint.reducer),
  ],
})
export class PointsModule {}
