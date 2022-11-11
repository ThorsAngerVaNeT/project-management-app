import { NgModule } from '@angular/core';

import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';

import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import BoardsRoutingModule from './boards.route.module';
import { ColumnsModule } from './../columns/columns.module';

@NgModule({
  declarations: [MainPageComponent, BoardDetailComponent, BoardAddComponent, BoardCardComponent],
  imports: [SharedModule, ColumnsModule, BoardsRoutingModule],
})
export class BoardsModule {}
