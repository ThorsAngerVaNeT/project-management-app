import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';
import TaskRoutingModule from './tasks-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/effects/task.effects';
import { StoreModule } from '@ngrx/store';
import * as fromTask from './store/reducers/task.reducer';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

@NgModule({
  declarations: [TaskAddComponent, TaskItemComponent, TasksListComponent],
  imports: [
    DragDropModule,
    SharedModule,
    TaskRoutingModule,
    EffectsModule.forFeature([TaskEffects]),
    StoreModule.forFeature(fromTask.tasksFeatureKey, fromTask.reducer),
  ],
  exports: [TaskItemComponent, TasksListComponent],
})
export class TasksModule {}
