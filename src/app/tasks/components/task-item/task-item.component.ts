import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { ColumnTaskWithUsers } from '../../model/task.model';
import { TaskAddComponent } from '../task-add/task-add.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task!: ColumnTaskWithUsers;

  constructor(
    private storeFacade: StoreFacade,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  editTask(): void {
    this.storeFacade.selectTask(this.task._id);
    this.modalService.create({
      nzContent: TaskAddComponent,
      nzComponentParams: { task: this.task, boardId: this.task.boardId },
    });
  }

  deleteTask(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: this.translateService.instant('itemToDeleteThisTask') },
      nzOkText: this.translateService.instant('ConfirmOkButton'),
      nzCancelText: this.translateService.instant('ConfirmCancelButton'),
      nzOnOk: () => {
        const { boardId, columnId, _id: taskId } = this.task;
        this.storeFacade.deleteTask(boardId, columnId, taskId);
      },
      nzOkDanger: true,
    });
  }
}
