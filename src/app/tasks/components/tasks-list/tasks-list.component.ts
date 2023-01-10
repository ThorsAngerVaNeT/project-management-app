import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkDragDrop, CdkDragMove, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnTaskWithUsers, ColumnTaskSetUpdateParams, ColumnTasksWithColumnId } from '../../model/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasksWithColumnId!: ColumnTasksWithColumnId;

  constructor(private storeFacade: StoreFacade) {}

  public trackById(index: number, item: ColumnTaskWithUsers): string {
    return item._id;
  }

  public drop(event: CdkDragDrop<ColumnTasksWithColumnId>): void {
    if (event.previousContainer === event.container) {
      if (event.previousIndex !== event.currentIndex) {
        const columnId = event.container.data.columnId;

        moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);

        const columnTaskSetUpdateParams = this.getColumnTaskSetUpdateParams(event.container.data.tasks, columnId);

        this.storeFacade.updateTasksSet(columnTaskSetUpdateParams);
      }
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

  private getColumnTaskSetUpdateParams(
    columnTasks: ColumnTaskWithUsers[],
    columnId: string,
  ): ColumnTaskSetUpdateParams[] {
    return columnTasks.map(({ _id }, index) => ({ _id, order: index, columnId }));
  }

  onDragMoved(event: CdkDragMove<ColumnTaskWithUsers[]>): void {
    const columnsContainer = this.storeFacade.getColumnsContainer();
    const clientWidth = columnsContainer.clientWidth;
    const scrollWidth = columnsContainer.scrollWidth;
    const deltaWidth = scrollWidth - clientWidth;

    const x = event.pointerPosition.x;
    const scrollingArea = Math.max(clientWidth / 5, 100); // 20% on each side but not less than 100px

    if (event.delta.x === 1) {
      // moving to right
      const deltaX = Math.max(Math.abs(x - clientWidth), 1);
      // if pointer is closer to right, then moving faster
      if (deltaX < scrollingArea) columnsContainer.scrollLeft += deltaWidth / deltaX;
    } else if (event.delta.x === -1) {
      // moving to left
      const deltaX = Math.max(Math.abs(x), 1);
      // if pointer is closer to left, then moving faster
      if (deltaX < scrollingArea) columnsContainer.scrollLeft -= deltaWidth / deltaX;
    }
  }
}
