import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Point } from '../../model/point.model';

@Component({
  selector: 'app-point-add',
  templateUrl: './point-add.component.html',
  styleUrls: ['./point-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointAddComponent implements OnInit {
  @Input() point!: Point;

  pointControl!: FormControl;

  @Output() pointTitleSave = new EventEmitter<string>();

  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.pointControl = new FormControl(this.point?.title, [Validators.required, Validators.maxLength(255)]);
  }

  submitHandler(): void {
    if (this.point._id) {
      this.updateTitle();
    } else {
      this.addPoint();
    }
  }

  addPoint(): void {
    if (this.pointControl.valid) {
      const { taskId, boardId } = this.point;
      const title = this.pointControl.value;
      const pointParams = {
        title,
        taskId,
        boardId,
        done: false,
      };

      if (this.point.taskId) {
        this.storeFacade.createPoint(pointParams);
      } else {
        const newTaskPointId = `${Date.now()}`;
        this.storeFacade.addNewTaskPoint(newTaskPointId, { ...pointParams, _id: newTaskPointId });
      }

      this.pointControl.reset();
    } else {
      this.pointControl.markAsDirty();
      this.pointControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  updateTitle(): void {
    if (this.pointControl.valid) {
      this.pointTitleSave.emit(this.pointControl.value);
    } else {
      this.pointControl.markAsDirty();
      this.pointControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  cancelEdit(): void {
    this.pointTitleSave.emit(this.point.title);
  }
}
