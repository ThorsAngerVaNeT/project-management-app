import { NgModule } from '@angular/core';

import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';
import TaskRoutingModule from './tasks.route.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskAddComponent],
  imports: [ReactiveFormsModule, SharedModule, TaskRoutingModule],
})
export class TasksModule {}
