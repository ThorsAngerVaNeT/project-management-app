import { NgModule } from '@angular/core';

import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';
import TaskRoutingModule from './tasks.route.module';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/effects/task.effects';
import { StoreModule } from '@ngrx/store';
import * as fromTask from './store/reducers/task.reducer';

@NgModule({
  declarations: [TaskAddComponent],
  imports: [
    SharedModule,
    TaskRoutingModule,
    EffectsModule.forFeature([TaskEffects]),
    StoreModule.forFeature(fromTask.tasksFeatureKey, fromTask.reducer),
  ],
})
export class TasksModule {}
