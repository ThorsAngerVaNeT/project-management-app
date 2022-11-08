import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  data = [];
}
