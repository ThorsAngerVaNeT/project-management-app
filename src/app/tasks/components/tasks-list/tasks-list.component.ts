import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnTask, ColumnTaskSetUpdateParams } from '../../model/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasks!: ColumnTask[];

  constructor(private storeFacade: StoreFacade) {}

  drop(event: CdkDragDrop<ColumnTask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      const columnTaskSetUpdateParams: ColumnTaskSetUpdateParams[] = event.container.data.map((task, index) => {
        return {
          _id: task._id,
          order: index,
          columnId: task.columnId,
        };
      });

      this.storeFacade.updateTasksSet(columnTaskSetUpdateParams);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
