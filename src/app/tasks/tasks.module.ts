import { NgModule } from '@angular/core';

import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';
import TaskRoutingModule from './tasks.route.module';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/effects/task.effects';
import { StoreModule } from '@ngrx/store';
import * as fromTask from './store/reducers/task.reducer';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

@NgModule({
  declarations: [TaskAddComponent, TasksListComponent],
  imports: [
    SharedModule,
    TaskRoutingModule,
    EffectsModule.forFeature([TaskEffects]),
    StoreModule.forFeature(fromTask.tasksFeatureKey, fromTask.reducer),
  ],
  exports: [TasksListComponent],
})
export class TasksModule {}
