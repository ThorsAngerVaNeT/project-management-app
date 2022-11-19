import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnTaskWithUsers } from '../../model/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasks!: ColumnTaskWithUsers[];
}
