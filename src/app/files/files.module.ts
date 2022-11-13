import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FileEffects } from './store/effects/file.effects';
import * as fromFile from './store/reducers/file.reducer';

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forFeature([FileEffects]),
    StoreModule.forFeature(fromFile.filesFeatureKey, fromFile.reducer),
  ],
})
export class FilesModule {}
