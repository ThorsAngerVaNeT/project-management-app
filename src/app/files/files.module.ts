import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { FileEffects } from './store/effects/file.effects';

@NgModule({
  declarations: [],
  imports: [EffectsModule.forFeature([FileEffects])],
})
export class FilesModule {}
