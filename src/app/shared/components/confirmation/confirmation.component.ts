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
  param?: string;

  confirmationTitle?: string;

  confirmationText?: string;

  constructor(private modalService: NzModalService) {}

  ngOnInit(): void {
    this.param = 'something to delete';
    this.confirmationTitle = $localize`:@@confirmationTitle: Are you sure?`;
    this.confirmationText = $localize`:@@confirmationText: Are you sure you want to delete`;
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: this.confirmationTitle,
      nzContent: `${this.confirmationText} ${this.param}?`,
      nzOnOk: () => console.log('OK'),
    });
  }
}
