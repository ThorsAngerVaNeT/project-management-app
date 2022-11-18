import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ColumnComponent } from '../../../columns/components/column/column.component';

@Component({
  selector: 'app-board',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailComponent implements OnInit {
  @ViewChild('newColumnPlaceholder', { read: ViewContainerRef }) newColumnPlaceholder!: ViewContainerRef;

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

  addNewColumn(): void {
    const componentRef = this.newColumnPlaceholder.createComponent(ColumnComponent);
    componentRef.instance.componentRef = componentRef;
  }
}
