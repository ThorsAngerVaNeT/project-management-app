import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Actions, ofType } from '@ngrx/effects';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, tap } from 'rxjs';
import { deleteUserSuccess, updateUserFailed, updateUserSuccess } from '@users/store/actions/user.actions';
import { userSignUpFailure, userSignUpSuccess } from '../../store/actions/user.actions';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import '@angular/localize/init';
import { User } from '../../../users/model/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  isVisible = true;

  isSaving = false;

  isDeleting = false;

  @Input() buttonText?: string;

  @Input() isEditing?: boolean;

  signUpForm!: FormGroup;

  subscription = new Subscription();

  user$ = this.storeFacade.user$.pipe(
    tap((user) => {
      this.user = user;
      this.signUpForm.patchValue(user);
    }),
  );

  user!: User;

  constructor(
    private storeFacade: StoreFacade,
    private action$: Actions,
    private modal: NzModalRef,
    private modalService: NzModalService,
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
      this.action$.pipe(ofType(userSignUpSuccess, updateUserSuccess, deleteUserSuccess)).subscribe(() => {
        this.handleCancel();
      }),
    );

    this.subscription.add(
      this.action$.pipe(ofType(userSignUpFailure, updateUserFailed)).subscribe(() => {
        this.isSaving = false;
        this.login?.setErrors({ userAlreadyExists: true });
      }),
    );
  }

  submitForm(): void {
    if (this.signUpForm.valid) {
      this.isSaving = true;
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
    this.storeFacade.updateUser(this.user._id, this.signUpForm.value);
  }

  deleteUser(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: $localize`:@@itemToDeleteYourAccount:your account` },
      nzOnOk: () => {
        this.isDeleting = true;
        this.storeFacade.deleteUser(this.user._id);
      },
      nzOkDanger: true,
    });
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
