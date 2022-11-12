import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { PointEffects } from './store/effects/point.effects';

@NgModule({
  declarations: [],
  imports: [EffectsModule.forFeature([PointEffects])],
})
export class PointsModule {}
