import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  isVisible = true;

  isLoading = false;

  logInForm!: FormGroup;

  subscription = new Subscription();

  constructor(private storeFacade: StoreFacade, private action$: Actions, private router: Router) {}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required]),
    });

    this.subscription.add(
      this.action$.pipe(ofType()).subscribe(() => {
        this.router.navigate(['/boards']);
      }),
    );
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
