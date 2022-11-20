import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnTasksWithColumnId } from '@tasks/model/task.model';
import { ColumnWithTasks } from '../../model/column.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() column!: ColumnWithTasks;

  public get tasksForTasksList(): ColumnTasksWithColumnId {
    return { columnId: this.column._id, tasks: this.column.tasks };
  }
}
