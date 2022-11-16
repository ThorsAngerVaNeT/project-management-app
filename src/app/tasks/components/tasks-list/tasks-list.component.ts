import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ColumnTask } from '../../model/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasks!: ColumnTask[];

  drop(event: CdkDragDrop<ColumnTask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
