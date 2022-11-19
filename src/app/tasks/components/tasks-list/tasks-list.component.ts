import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnTask, ColumnTaskSetUpdateParams, ColumnTasksWithColumnId } from '../../model/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasksWithColumnId!: ColumnTasksWithColumnId;

  constructor(private storeFacade: StoreFacade) {}

  public trackById(index: number, item: ColumnTask): string {
    return item._id;
  }

  public drop(event: CdkDragDrop<ColumnTasksWithColumnId>): void {
    if (event.previousContainer === event.container) {
      const columnId = event.container.data.columnId;

      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);

      const columnTaskSetUpdateParams = this.getColumnTaskSetUpdateParams(event.container.data.tasks, columnId);

      this.storeFacade.updateTasksSet(columnTaskSetUpdateParams);
    } else {
      const previousColumnId = event.previousContainer.data.columnId;
      const currentColumnId = event.container.data.columnId;

      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex,
      );

      const previousColumnTaskSetUpdateParams = this.getColumnTaskSetUpdateParams(
        event.previousContainer.data.tasks,
        previousColumnId,
      );
      const currentColumnTaskSetUpdateParams = this.getColumnTaskSetUpdateParams(
        event.container.data.tasks,
        currentColumnId,
      );

      this.storeFacade.updateTasksSet([...previousColumnTaskSetUpdateParams, ...currentColumnTaskSetUpdateParams]);
    }
  }

  private getColumnTaskSetUpdateParams(columnTasks: ColumnTask[], columnId: string): ColumnTaskSetUpdateParams[] {
    return columnTasks.map(({ _id }, index) => ({ _id, order: index, columnId }));
  }
}
