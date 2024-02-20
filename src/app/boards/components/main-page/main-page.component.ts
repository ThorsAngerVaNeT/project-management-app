import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { BoardAddComponent } from '../board-add/board-add.component';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private storeFacade: StoreFacade,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.storeFacade.getBoardsAllData();
  }

  addBoard(): void {
    this.modalService.create({
      nzTitle: this.translateService.instant('CreateBoardModalTitle'),
      nzContent: BoardAddComponent,
      nzWidth: 'null',
      nzClassName: 'form-scrollable',
      nzStyle: { top: '40px' },
    });
  }
}
