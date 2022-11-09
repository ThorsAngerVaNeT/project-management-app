import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskAddComponent],
  imports: [CommonModule, SharedModule],
})
export class TaskModule {}
