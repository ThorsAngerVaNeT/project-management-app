import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { Board } from '@boards/model/board.model';
import { Column } from '@columns/model/column.model';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnTaskParams, ColumnTaskUpdateParams, ColumnTaskWithUsers } from '../../model/task.model';
import { EMPTY_POINT, Point } from '@points/model/point.model';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddComponent implements OnInit {
  @Input() task!: ColumnTaskWithUsers;

  isVisible = true;

  boardId!: Board['_id'];

  columnId!: Column['_id'];

  order!: number;

  taskAddForm!: FormGroup;

  users$ = this.storeFacade.users$;

  points$!: Observable<Point[]>;

  pointControl!: FormControl;

  points: Point[] = [];

  constructor(private storeFacade: StoreFacade, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.taskAddForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      responsible: new FormControl(null, [Validators.required]),
      participants: new FormControl([]),
    });

    if (this.task) {
      const { title, description, userId: responsible, users } = this.task;
      const participants = users.map((user) => user._id);

      this.points$ = this.storeFacade.points$;

      this.storeFacade.getPointsByTask(this.task._id);

      this.taskAddForm.setValue({ title, description, responsible, participants });
    } else {
      this.points$ = of(this.points);
    }

    this.pointControl = new FormControl('', Validators.required);
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

      if (this.task) {
        const { _id: taskId, boardId, columnId, order } = this.task;
        const taskParams: ColumnTaskUpdateParams = {
          title,
          description,
          userId,
          users,
          order,
          columnId,
        };

        this.storeFacade.updateTask(boardId, columnId, taskId, taskParams);
      } else {
        const taskParams: ColumnTaskParams = { title, description, userId, users, order: this.order };

        this.storeFacade.createTask(
          this.boardId,
          this.columnId,
          taskParams,
          this.points.map(({ _id, ...pointParams }) => pointParams),
        );
      }
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

  addPoint(): void {
    if (this.pointControl.valid) {
      const title = this.pointControl.value;
      if (this.task) {
        const { boardId, _id: taskId } = this.task;
        const pointParams = {
          title,
          taskId,
          boardId,
          done: false,
        };

        this.storeFacade.createPoint(pointParams);
      } else {
        this.points.push({ ...EMPTY_POINT, title, boardId: this.boardId });
      }

      this.pointControl.reset();
    } else {
      this.pointControl.markAsDirty();
      this.pointControl.updateValueAndValidity({ onlySelf: true });
    }
  }
}
