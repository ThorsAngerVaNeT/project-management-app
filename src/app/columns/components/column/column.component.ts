import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() column!: Column;
}
