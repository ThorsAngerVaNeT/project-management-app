import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  param: string = 'something to delete';

  constructor(private modalService: NzModalService) {}

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure?',
      nzContent: `Are you sure you want to delete ${this.param}?`,
      nzOnOk: () => console.log('OK'),
    });
  }
}
