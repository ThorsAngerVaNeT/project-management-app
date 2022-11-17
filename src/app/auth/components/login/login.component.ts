import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  isVisible = true;

  logInForm!: FormGroup;

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get login(): AbstractControl | null {
    return this.logInForm.get('login');
  }

  get password(): AbstractControl | null {
    return this.logInForm.get('password');
  }

  submitForm(): void {
    console.log('Form Submitted: ', this.logInForm);
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
    this.isVisible = false;
  }
}
