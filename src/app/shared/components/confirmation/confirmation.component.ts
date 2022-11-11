import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import '@angular/localize/init';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  param: string = 'something to delete';

  confirmationTitle: string = $localize`:@@confirmationTitle: Are you sure?`;

  confirmationText: string = $localize`:@@confirmationText: Are you sure you want to delete`;

  constructor(private modalService: NzModalService) {}

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: this.confirmationTitle,
      nzContent: `${this.confirmationText} ${this.param}?`,
      nzOnOk: () => console.log('OK'),
    });
  }
}
