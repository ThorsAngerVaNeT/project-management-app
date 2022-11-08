import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isVisible = true;

  handleOk(): void {
    console.log('Button ok clicked');
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
  }
}
