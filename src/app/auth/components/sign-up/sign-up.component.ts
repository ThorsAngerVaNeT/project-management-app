import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  isVisible = true;

  signUpForm!: FormGroup;

  constructor() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  submitForm(): void {
    console.log('Form Submitted: ', this.signUpForm);
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
    this.isVisible = false;
  }
}
