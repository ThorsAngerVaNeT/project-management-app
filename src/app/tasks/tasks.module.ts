import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';
import TaskRoutingModule from './tasks.route.module';

@NgModule({
  declarations: [TaskAddComponent],
  imports: [CommonModule, SharedModule, TaskRoutingModule],
})
export class TasksModule {}
