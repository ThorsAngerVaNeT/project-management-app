import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { BoardWithUsers } from '../../model/board.model';
import { Observable, tap } from 'rxjs';
import { BoardAddComponent } from '../board-add/board-add.component';
import '@angular/localize/init';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent implements OnInit {
  @Input() board!: BoardWithUsers;

  boardCoverUrl$!: Observable<string>;

  user$ = this.storeFacade.user$.pipe(
    tap((user) => {
      if (user._id === this.board.owner._id) {
        this.isOwner = true;
      }
      if (this.board.users.map((boardUser) => boardUser._id).includes(user._id)) {
        this.isParticipant = true;
      }
    }),
  );

  isOwner = false;

  isParticipant = false;

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.boardCoverUrl$ = this.storeFacade.getBoardCoverStream(this.board._id);
  }

  editBoard(): void {
    this.modalService.create({ nzContent: BoardAddComponent, nzComponentParams: { board: this.board } });
  }

  removeBoard(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: $localize`:@@itemToDeleteThisBoard:this board` },
      nzOnOk: () => {
        this.storeFacade.deleteBoard(this.board._id);
      },
      nzOkDanger: true,
    });
  }

  showInfo(): void {
    if (this.isOwner || this.isParticipant) return;
    this.modalService.info({
      nzTitle: $localize`:@@AccessDeniedModalTitle:Access Denied`,
      nzContent: $localize`:@@AccessDeniedModalContent:You are not the participant of this board!`,
    });
  }

  get routerLink(): string[] | null {
    return this.isOwner || this.isParticipant ? ['/boards', this.board._id] : null;
  }
}
