import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { ColumnWithTasks } from '../../models/column.model';
import { TaskAddComponent } from '../../../tasks/components/task-add/task-add.component';

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

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.titleControl = new FormControl('', Validators.required);
  }

  toggleEdit(): void {
    this.isEditState = !this.isEditState;
    if (this.isEditState) {
      this.titleControl.setValue(this.column.title);
    }
  }

  createColumn(): void {
    if (this.titleControl.valid) {
      const { boardId, order } = this.column;
      this.storeFacade.createColumn(boardId, { title: this.titleControl.value, order });
      this.deleteComponent();
    } else if (this.titleControl.invalid) {
      this.titleControl.markAsDirty();
      this.titleControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  updateColumn(): void {
    if (this.titleControl.valid) {
      const { boardId, _id: columnId, tasks, ...columnParams } = this.column;
      columnParams.title = this.titleControl.value;
      this.storeFacade.updateColumn(boardId, columnId, columnParams);
    }
  }

  deleteColumn(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: 'this column' },
      nzOnOk: () => {
        const { boardId, _id: columnId } = this.column;
        this.storeFacade.deleteColumn(boardId, columnId);
      },
      nzOkDanger: true,
    });
  }

  deleteComponent(): void {
    this.componentRef.destroy();
  }

  addTask(): void {
    const { boardId, _id: columnId } = this.column;
    this.modalService.create({ nzContent: TaskAddComponent, nzComponentParams: { boardId, columnId } });
  }
}
