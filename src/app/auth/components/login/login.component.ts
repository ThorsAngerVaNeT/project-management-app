import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isVisible = true;

  logInForm!: FormGroup;

  constructor() {
    this.logInForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  submitForm(): void {
    console.log('Form Submitted: ', this.logInForm);
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
    this.isVisible = false;
  }
}
