import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './components/task-add/task-add.component';

const routes: Routes = [{ path: 'task-new', component: TaskAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class TaskRoutingModule {}
