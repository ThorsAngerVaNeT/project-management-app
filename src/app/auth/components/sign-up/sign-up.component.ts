import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { User } from '@users/model/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  user!: User;

  user$ = this.storeFacade.user$.pipe(
    tap((user) => {
      this.user = user;
      this.signUpForm.patchValue(user);
    }),
  );

  authViewModel$ = this.storeFacade.selectAuthViewModel$;

  activeButton = '';

  constructor(
    private storeFacade: StoreFacade,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      login: new FormControl(this.user ? this.user.login : '', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      name: new FormControl(this.user ? this.user.name : '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      ]),
    });
  }

  submitForm(): void {
    if (this.signUpForm.valid) {
      this.activeButton = 'submit';

      if (this.user._id) {
        this.storeFacade.updateUser(this.user._id, this.signUpForm.value);
      } else {
        const { name, login, password } = this.signUpForm.value;
        this.storeFacade.signUp({ name, login, password });
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

  deleteUser(): void {
    this.modalService.confirm({
      nzContent: ConfirmationComponent,
      nzComponentParams: { itemToDelete: this.translateService.instant('itemToDeleteYourAccount') },
      nzOkText: this.translateService.instant('ConfirmOkButton'),
      nzCancelText: this.translateService.instant('ConfirmCancelButton'),
      nzOnOk: () => {
        this.activeButton = 'delete';
        this.storeFacade.deleteUser(this.user._id);
      },
      nzOkDanger: true,
      nzWidth: 'null',
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

  get title(): string {
    return this.user._id
      ? this.translateService.instant('editProfile')
      : this.translateService.instant('SignUpModalTitle');
  }

  get btnSubmitCaption(): string {
    return this.user._id
      ? this.translateService.instant('SaveButtonText')
      : this.translateService.instant('SignUpButton');
  }
}
