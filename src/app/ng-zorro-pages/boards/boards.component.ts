import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent {
  data = [];
}
