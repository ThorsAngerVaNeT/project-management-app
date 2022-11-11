import { NgModule } from '@angular/core';

import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';
import TaskRoutingModule from './tasks.route.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [TaskAddComponent],
  imports: [CoreModule, SharedModule, TaskRoutingModule],
})
export class TasksModule {}
