import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardUserGuard } from '../core/guards/board-user/board-user.guard';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: ':boardId', component: BoardDetailComponent, canActivate: [BoardUserGuard], canLoad: [BoardUserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BoardsRoutingModule {}
