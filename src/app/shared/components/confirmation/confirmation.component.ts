import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  itemToDelete!: string;
}
