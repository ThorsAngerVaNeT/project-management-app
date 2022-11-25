import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import '@angular/localize/init';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { BoardAddComponent } from '../board-add/board-add.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  boards$ = this.storeFacade.boards$;

  boardsLoading$ = this.storeFacade.boardsLoading$;

  boardsLoaded$ = this.storeFacade.boardsLoaded$;

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.storeFacade.getBoardsAllData();
    this.storeFacade.getUsers();
  }

  showModal(): void {
    this.modalService.create({ nzContent: BoardAddComponent });
  }
}
