import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './store/effects/board.effects';
import * as fromBoard from './store/reducers/board.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBoard.boardsFeatureKey, fromBoard.reducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardsModule {}
