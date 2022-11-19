import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Actions, ofType } from '@ngrx/effects';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { UserParams } from '@users/models/user.model';
import { updateUserSuccess } from '@users/store/actions/user.actions';
import { userSignUpSuccess } from '../../store/actions/user.actions';
import { Router } from '@angular/router';

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

  @Input() buttonText?: string;

  @Input() isEditing?: boolean;

  user$ = this.storeFacade.user$;

  constructor(
    private storeFacade: StoreFacade,
    private action$: Actions,
    private modal: NzModalRef,
    private router: Router,
  ) {}

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
      this.action$.pipe(ofType(userSignUpSuccess, updateUserSuccess)).subscribe(() => {
        this.router.navigate(['/boards']);
        this.handleCancel();
      }),
    );

    if (this.isEditing) {
      this.subscription.add(
        this.user$.subscribe((user) => {
          this.login?.setValue(user.login);
          this.name?.setValue(user.name);
        }),
      );
    }
  }

  submitForm(): void {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      if (this.isEditing) {
        this.editUser();
      } else {
        this.signUp();
      }
    } else {
      Object.values(this.signUpForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  signUp(): void {
    const { name, login, password } = this.signUpForm.value;
    this.storeFacade.signUp({ name, login, password });
  }

  editUser(): void {
    console.log('editing...');
    this.subscription.add(
      this.user$.subscribe((user) => {
        const userParams: UserParams = {
          name: this.signUpForm.value.name,
          login: this.signUpForm.value.login,
          password: this.signUpForm.value.password,
        };
        console.log(user._id, userParams);
        // this.storeFacade.updateUser(user._id, userParams);
      }),
    );
  }

  deleteUser(): void {
    // todo
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
