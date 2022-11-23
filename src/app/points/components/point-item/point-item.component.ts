import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { Point } from '../../model/point.model';

@Component({
  selector: 'app-point-item',
  templateUrl: './point-item.component.html',
  styleUrls: ['./point-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointItemComponent implements OnInit {
  @Input() point!: Point;

  isChecked!: boolean;

  isEdit = false;

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.isChecked = this.point.done;
  }

  toggleDone(): void {
    this.isChecked = !this.isChecked;
    this.updatePoint(this.point.title);
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  updatePoint(title: string): void {
    const { _id: pointId, taskId } = this.point;

    if (taskId) {
      this.storeFacade.updatePoint(pointId, { title, done: this.isChecked });
    } else {
      this.storeFacade.updateNewTaskPoint(pointId, { title, done: this.isChecked });
    }
  }

  deletePoint(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: 'this check point' },
      nzOnOk: () =>
        this.point.taskId
          ? this.storeFacade.deletePoint(this.point._id)
          : this.storeFacade.deleteNewTaskPoint(this.point._id),
      nzOkDanger: true,
    });
  }
}
