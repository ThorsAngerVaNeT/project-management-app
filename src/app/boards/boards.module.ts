import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './components/board/board.component';

import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { ColumnsModule } from '../columns/columns.module';
import BoardsRoutingModule from './boards.route.module';

@NgModule({
  declarations: [MainPageComponent, BoardComponent, BoardAddComponent, BoardCardComponent],
  imports: [CommonModule, SharedModule, ColumnsModule, BoardsRoutingModule],
})
export class BoardsModule {}
