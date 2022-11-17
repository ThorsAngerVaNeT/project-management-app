import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Actions, ofType } from '@ngrx/effects';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { userSignUpSuccess } from '../../store/actions/user.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  isVisible = true;

  isLoading = false;

  signUpForm!: FormGroup;

  subscription = new Subscription();

  constructor(private storeFacade: StoreFacade, private action$: Actions, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(2)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      ]),
    });

    this.subscription.add(
      this.action$.pipe(ofType(userSignUpSuccess)).subscribe(() => {
        this.handleCancel();
      }),
    );
  }

  submitForm(): void {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      const { name, login, password } = this.signUpForm.value;
      this.storeFacade.signUp({ name, login, password });
    } else {
      Object.values(this.signUpForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get name(): AbstractControl | null {
    return this.signUpForm.get('name');
  }

  get login(): AbstractControl | null {
    return this.signUpForm.get('login');
  }

  get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleCancel(): void {
    this.modal.destroy();
  }
}
