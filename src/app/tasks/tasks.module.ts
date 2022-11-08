import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskAddComponent],
  imports: [CommonModule, SharedModule, NzFormModule, NzModalModule, NzSelectModule, NzDividerModule, NzCheckboxModule],
})
export class TaskModule {}
