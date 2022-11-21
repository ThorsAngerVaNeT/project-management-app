import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { map } from 'rxjs';
import { ColumnComponent } from '@columns/components/column/column.component';
import { BoardDetailViewModel } from '../../model/board.model';
import { ColumnSetUpdateParams, ColumnWithTasks } from '@columns/model/column.model';

@Component({
  selector: 'app-board',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailComponent implements OnInit {
  @ViewChild('newColumnPlaceholder', { read: ViewContainerRef }) newColumnPlaceholder!: ViewContainerRef;

  boardId!: string;

  columnsCount!: number;

  boardDetail$ = this.storeFacade.boardDetail$.pipe(
    map((boardDetail: BoardDetailViewModel) => {
      this.columnsCount = boardDetail.columns.length;
      return boardDetail;
    }),
  );

  constructor(private route: ActivatedRoute, private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.storeFacade.getUsers();
    this.route.params.subscribe((param) => {
      const { boardId } = param;
      this.boardId = boardId;
      this.storeFacade.getBoardAllData(boardId);
    });
  }

  addNewColumn(): void {
    const componentRef = this.newColumnPlaceholder.createComponent(ColumnComponent);
    componentRef.instance.componentRef = componentRef;
    componentRef.setInput('column', { boardId: this.boardId, order: this.columnsCount });
  }

  public trackById(index: number, item: ColumnWithTasks): string {
    return item._id;
  }

  public drop(event: CdkDragDrop<ColumnWithTasks[]>): void {
    if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      const columnSetUpdateParams = this.getColumnSetUpdateParams(event.container.data);

      this.storeFacade.updateColumnsSet(columnSetUpdateParams);
    }
  }

  private getColumnSetUpdateParams(columns: ColumnWithTasks[]): ColumnSetUpdateParams[] {
    return columns.map(({ _id }, index) => ({ _id, order: index }));
  }
}
