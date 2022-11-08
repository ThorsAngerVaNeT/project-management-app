import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardAddComponent {}
