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

  public trackById(index: number, item: ColumnTask): string {
    return item._id;
  }

  public drop(event: CdkDragDrop<ColumnTask[]>): void {
    if (event.previousContainer === event.container) {
      const columnId = event.container.data[0].columnId;

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      const columnTaskSetUpdateParams = this.getColumnTaskSetUpdateParams(event.container.data, columnId);

      this.storeFacade.updateTasksSet(columnTaskSetUpdateParams);
    } else {
      const previousColumnId = event.previousContainer.data[0].columnId;
      const currentColumnId = event.container.data[0].columnId;

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const previousColumnTaskSetUpdateParams = this.getColumnTaskSetUpdateParams(
        event.previousContainer.data,
        previousColumnId,
      );
      const currentColumnTaskSetUpdateParams = this.getColumnTaskSetUpdateParams(event.container.data, currentColumnId);

      this.storeFacade.updateTasksSet([...previousColumnTaskSetUpdateParams, ...currentColumnTaskSetUpdateParams]);
    }
  }

  private getColumnTaskSetUpdateParams(columnTasks: ColumnTask[], columnId: string): ColumnTaskSetUpdateParams[] {
    return columnTasks.map((task, index) => {
      return {
        _id: task._id,
        order: index,
        columnId: columnId,
      };
    });
  }
}
