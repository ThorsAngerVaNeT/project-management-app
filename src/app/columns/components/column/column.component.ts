import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { ColumnTasksWithColumnId } from '@tasks/model/task.model';
import { ColumnWithTasks } from '../../model/column.model';
import { TaskAddComponent } from '@tasks/components/task-add/task-add.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() column!: ColumnWithTasks;

  componentRef!: ComponentRef<ColumnComponent>;

  titleControl!: FormControl;

  isEditState = false;

  constructor(
    private storeFacade: StoreFacade,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.titleControl = new FormControl('', Validators.required);
  }

  toggleEdit(): void {
    this.isEditState = !this.isEditState;
    if (this.isEditState) {
      this.titleControl.setValue(this.column.title);
    }
  }

  updateColumn(): void {
    if (this.titleControl.valid) {
      const { boardId, _id: columnId, tasks, ...columnParams } = this.column;
      columnParams.title = this.titleControl.value;
      this.storeFacade.updateColumn(boardId, columnId, columnParams);
      this.toggleEdit();
    }
  }

  deleteColumn(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: this.translateService.instant('itemToDeleteThisColumn') },
      nzOnOk: () => {
        const { boardId, _id: columnId } = this.column;
        this.storeFacade.deleteColumn(boardId, columnId);
      },
      nzOkDanger: true,
    });
  }

  addTask(): void {
    const { boardId, _id: columnId } = this.column;

    this.storeFacade.selectTask('');
    this.modalService.create({
      nzTitle: this.translateService.instant('CreateTaskModalTitle'),
      nzContent: TaskAddComponent,
      nzComponentParams: { boardId, columnId, order: this.column.tasks.length },
    });
  }

  public get tasksForTasksList(): ColumnTasksWithColumnId {
    return { columnId: this.column._id, tasks: this.column.tasks };
  }
}
