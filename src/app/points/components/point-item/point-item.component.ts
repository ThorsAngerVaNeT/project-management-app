import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
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

  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.isChecked = this.point.done;
  }

  updatePoint(): void {
    const { _id: pointId, boardId, taskId, ...pointParams } = this.point;

    this.isChecked = !this.isChecked;
    this.storeFacade.updatePoint(pointId, { ...pointParams, done: this.isChecked });
  }

  deletePoint(): void {
    console.log('delete point');
  }
}
