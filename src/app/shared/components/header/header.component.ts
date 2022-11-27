import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoginComponent } from '@auth/components/login/login.component';
import { SignUpComponent } from '@auth/components/sign-up/sign-up.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  user$ = this.storeFacade.user$;

  constructor(
    private storeFacade: StoreFacade,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  signOut(): void {
    this.storeFacade.signOut();
  }

  signUp(): void {
    this.modalService.create({
      nzContent: SignUpComponent,
      nzFooter: null,
      nzTitle: this.translateService.instant('SignUpModalTitle'),
      nzComponentParams: {
        buttonText: this.translateService.instant('SignUpButton'),
      },
    });
  }

  logIn(): void {
    this.modalService.create({ nzContent: LoginComponent, nzFooter: null });
  }

  editProfile(): void {
    this.modalService.create({
      nzContent: SignUpComponent,
      nzFooter: null,
      nzTitle: this.translateService.instant('EditProfileModalTitle'),
      nzComponentParams: {
        buttonText: this.translateService.instant('EditProfileSaveButton'),
        isEditing: true,
      },
    });
  }
}
