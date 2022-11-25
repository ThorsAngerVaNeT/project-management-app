import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { BoardWithUsers } from '../../model/board.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent implements OnInit {
  @Input() board!: BoardWithUsers;

  boardCoverUrl$!: Observable<string>;

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.boardCoverUrl$ = this.storeFacade.getBoardCoverStream(this.board._id);
  }

  removeBoard(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: $localize`:@@itemToDeleteThisBoard:this board` },
      nzOnOk: () => {
        this.storeFacade.deleteBoard(this.board._id);
      },
      nzOkDanger: true,
      nzWidth: 'null',
    });
  }
}
