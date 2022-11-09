import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardComponent } from './components/board/board.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'board-add', component: BoardAddComponent },
  { path: 'board', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BoardsRoutingModule {}
