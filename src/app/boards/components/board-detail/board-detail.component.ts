import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { map } from 'rxjs';
import { ColumnComponent } from '../../../columns/components/column/column.component';
import { BoardDetailViewModel } from '../../models/board.model';

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
}
