import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Board } from '@boards/model/board.model';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnTask } from '@tasks/model/task.model';
import { PointItemComponent } from '../point-item/point-item.component';

@Component({
  selector: 'app-point-add',
  templateUrl: './point-add.component.html',
  styleUrls: ['./point-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointAddComponent implements OnInit {
  @Input() pointInputParams!: { taskId: ColumnTask['_id']; boardId: Board['_id'] };

  pointControl!: FormControl;

  parent!: PointItemComponent;

  constructor(@Optional() parent: PointItemComponent, private storeFacade: StoreFacade) {
    this.parent = parent;
  }

  ngOnInit(): void {
    this.pointControl = new FormControl(this.parent ? this.parent.point.title : '', [
      Validators.required,
      Validators.maxLength(255),
    ]);
  }

  addPoint(): void {
    if (this.pointControl.valid) {
      const { taskId, boardId } = this.pointInputParams;
      const title = this.pointControl.value;
      const pointParams = {
        title,
        taskId,
        boardId,
        done: false,
      };

      if (this.pointInputParams.taskId) {
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
      this.parent.toggleEdit();
      this.parent.updatePoint(this.pointControl.value);
    } else {
      this.pointControl.markAsDirty();
      this.pointControl.updateValueAndValidity({ onlySelf: true });
    }
  }
}
