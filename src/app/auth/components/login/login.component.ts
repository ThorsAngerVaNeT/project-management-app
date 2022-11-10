import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isVisible = true;

  submitForm(): void {}

  handleCancel(): void {
    console.log('Button cancel clicked');
    this.isVisible = false;
  }
}
