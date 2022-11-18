import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Board } from '../../../boards/models/board.model';
import { Column } from '../../../columns/models/column.model';
import { StoreFacade } from '../../../core/services/store-facade/store-facade';
import { ColumnTaskParams } from '../../model/task.model';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddComponent implements OnInit {
  isVisible = true;

  boardId!: Board['_id'];

  columnId!: Column['_id'];

  order!: number;

  taskAddForm!: FormGroup;

  users$ = this.storeFacade.users$;

  constructor(private storeFacade: StoreFacade, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.taskAddForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      responsible: new FormControl('', [Validators.required]),
      participants: new FormControl([]),
    });
  }

  get title(): AbstractControl | null {
    return this.taskAddForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.taskAddForm.get('description');
  }

  get responsible(): AbstractControl | null {
    return this.taskAddForm.get('responsible');
  }

  handleOk(): void {
    if (this.taskAddForm.valid) {
      const { title, description, responsible: userId, participants: users } = this.taskAddForm.value;
      const taskParams: ColumnTaskParams = { title, description, userId, users, order: this.order };

      this.storeFacade.createTask(this.boardId, this.columnId, taskParams);
      this.handleCancel();
    } else {
      Object.values(this.taskAddForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    this.modal.destroy();
  }
}
