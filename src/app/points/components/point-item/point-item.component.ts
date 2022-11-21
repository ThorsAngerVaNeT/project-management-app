import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Point } from '../../model/point.model';

@Component({
  selector: 'app-point-item',
  templateUrl: './point-item.component.html',
  styleUrls: ['./point-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointItemComponent {
  @Input() point!: Point;

  deletePoint(): void {
    console.log('delete point');
  }
}
