import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BoardWithUsers } from '../../models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() board!: BoardWithUsers;
}
