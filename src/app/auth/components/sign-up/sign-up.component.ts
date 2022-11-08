import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  handleOk(): void {
    console.log('Button ok clicked');
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
  }
}
