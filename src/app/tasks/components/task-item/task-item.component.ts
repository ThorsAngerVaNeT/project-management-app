import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnTask } from '../../model/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task!: ColumnTask;
}
