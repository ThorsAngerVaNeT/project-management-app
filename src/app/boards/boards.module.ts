import { NgModule } from '@angular/core';

import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardDetailComponent } from './components/board/board-detail.component';

import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardCardComponent } from './components/board-card/board-card.component';

import BoardsRoutingModule from './boards.route.module';
import { ColumnsModule } from './../columns/columns.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainPageComponent, BoardDetailComponent, BoardAddComponent, BoardCardComponent],
  imports: [ReactiveFormsModule, SharedModule, ColumnsModule, BoardsRoutingModule],
})
export class BoardsModule {}
