import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'new', component: BoardAddComponent },
  { path: ':boardId', component: BoardDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BoardsRoutingModule {}
