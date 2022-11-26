import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import '@angular/localize/init';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { ColumnTaskWithUsers } from '../../model/task.model';
import { TaskAddComponent } from '../task-add/task-add.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task!: ColumnTaskWithUsers;

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService) {}

  editTask(): void {
    this.storeFacade.selectTask(this.task._id);
    this.modalService.create({
      nzTitle: $localize`:@@EditTaskModalTitle:Edit Task`,
      nzContent: TaskAddComponent,
      nzComponentParams: { task: this.task },
      nzWidth: 'null',
      nzClassName: 'form-scrollable',
      nzStyle: { top: '40px' },
    });
  }

  deleteTask(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: $localize`:@@itemToDeleteThisTask:'this task` },
      nzOnOk: () => {
        const { boardId, columnId, _id: taskId } = this.task;
        this.storeFacade.deleteTask(boardId, columnId, taskId);
      },
      nzOkDanger: true,
      nzWidth: 'null',
    });
  }
}
