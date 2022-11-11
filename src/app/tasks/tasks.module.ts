import { NgModule } from '@angular/core';

import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';
import TaskRoutingModule from './tasks.route.module';

@NgModule({
  declarations: [TaskAddComponent],
  imports: [SharedModule, TaskRoutingModule],
})
export class TasksModule {}
