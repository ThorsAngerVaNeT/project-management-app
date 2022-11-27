import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { StoreFacade } from '@core/services/store-facade/store-facade';
import { map, Observable, Subscription } from 'rxjs';
import { BoardDetailViewModel } from '../../model/board.model';
import { ColumnSetUpdateParams, ColumnWithTasks } from '@columns/model/column.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnAddComponent } from '@columns/components/column-add/column-add.component';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-board',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailComponent implements OnInit, OnDestroy {
  boardId!: string;

  columnsCount!: number;

  boardDetail$ = this.storeFacade.boardDetail$.pipe(
    map((boardDetail: BoardDetailViewModel) => {
      this.columnsCount = boardDetail.columns.length;
      return boardDetail;
    }),
  );

  boardCoverUrl$!: Observable<string>;

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private storeFacade: StoreFacade,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.storeFacade.getUsers();
    this.subscription.add(
      this.route.params.subscribe((param) => {
        const { boardId } = param;
        this.boardId = boardId;
        this.storeFacade.getBoardAllData(boardId);
        this.boardCoverUrl$ = this.storeFacade.getBoardCoverStream(boardId);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewColumn(): void {
    this.modalService.create({
      nzTitle: this.translateService.instant('CreateColumnModalTitle'),
      nzContent: ColumnAddComponent,
      nzComponentParams: { boardId: this.boardId, order: this.columnsCount },
    });
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
