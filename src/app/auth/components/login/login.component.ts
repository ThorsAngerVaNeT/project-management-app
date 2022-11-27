import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  isVisible = true;

  isLoading = false;

  logInForm!: FormGroup;

  constructor(private storeFacade: StoreFacade, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm(): void {
    if (this.logInForm.valid) {
      this.isLoading = true;
      const { login, password } = this.logInForm.value;
      this.storeFacade.signIn({ login, password });
    } else {
      Object.values(this.logInForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get login(): AbstractControl | null {
    return this.logInForm.get('login');
  }

  get password(): AbstractControl | null {
    return this.logInForm.get('password');
  }
}
