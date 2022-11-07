import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import * as fromBoard from './store/reducers/board.reducer';
import { BoardEffects } from './store/effects/board.effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBoard.boardsFeatureKey, fromBoard.reducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardsModule {}
