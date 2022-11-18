import { ChangeDetectionStrategy, Component, ComponentRef, Input } from '@angular/core';
import { ColumnWithTasks } from '../../models/column.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() column!: ColumnWithTasks;

  componentRef!: ComponentRef<ColumnComponent>;

  deleteComponent(): void {
    this.componentRef.destroy();
  }
}
