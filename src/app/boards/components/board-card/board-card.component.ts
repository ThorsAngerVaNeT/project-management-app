import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StoreFacade } from '../../../core/services/store-facade/store-facade';
import { BoardWithUsers } from '../../models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() board!: BoardWithUsers;

  constructor(private storeFacade: StoreFacade) {}

  removeBoard(): void {
    this.storeFacade.deleteBoard(this.board._id);
  }
}
