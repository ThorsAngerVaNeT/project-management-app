import { NgModule } from '@angular/core';

import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';

import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import BoardsRoutingModule from './boards-routing.module';
import { ColumnsModule } from '@columns/columns.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './store/effects/board.effects';
import * as fromBoard from './store/reducers/board.reducer';
import { UsersModule } from '@users/users.module';

@NgModule({
  declarations: [MainPageComponent, BoardDetailComponent, BoardAddComponent, BoardCardComponent],
  imports: [
    SharedModule,
    ColumnsModule,
    BoardsRoutingModule,
    StoreModule.forFeature(fromBoard.boardsFeatureKey, fromBoard.reducer),
    EffectsModule.forFeature([BoardEffects]),
    UsersModule,
  ],
})
export class BoardsModule {}
