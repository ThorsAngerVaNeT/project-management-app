import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnSetUpdateParams, ColumnWithTasks } from '@columns/models/column.model';

@Component({
  selector: 'app-board',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailComponent implements OnInit {
  data = [];

  boardDetail$ = this.storeFacade.boardDetail$;

  constructor(private route: ActivatedRoute, private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.storeFacade.getUsers();
    this.route.params.subscribe((param) => {
      const { boardId } = param;
      this.storeFacade.getBoardAllData(boardId);
    });
  }

  public trackById(index: number, item: ColumnWithTasks): string {
    return item._id;
  }

  public drop(event: CdkDragDrop<ColumnWithTasks[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      const columnSetUpdateParams = this.getColumnSetUpdateParams(event.container.data);

      this.storeFacade.updateColumnsSet(columnSetUpdateParams);
    }
  }

  private getColumnSetUpdateParams(columns: ColumnWithTasks[]): ColumnSetUpdateParams[] {
    return columns.map((column, index) => {
      return {
        _id: column._id,
        order: index,
      };
    });
  }
}
