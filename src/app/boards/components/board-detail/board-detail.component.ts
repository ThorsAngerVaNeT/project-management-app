import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Component({
  selector: 'app-board',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailComponent implements OnInit {
  data = [];

  currentBoard$ = this.storeFacade.currentBoard$;

  boardId$ = this.storeFacade.boardId$;

  columns$ = this.storeFacade.columns$;

  constructor(private route: ActivatedRoute, private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.storeFacade.getUsers();
    this.route.params.subscribe((param) => {
      const { boardId } = param;
      this.storeFacade.getBoardAllData(boardId);
    });
  }
}
