import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './ng-zorro-pages/boards/boards.component';
import { MainComponent } from './ng-zorro-pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'boards', component: BoardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
