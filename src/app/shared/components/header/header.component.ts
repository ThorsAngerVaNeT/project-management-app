import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoginComponent } from '@auth/components/login/login.component';
import { SignUpComponent } from '@auth/components/sign-up/sign-up.component';
import '@angular/localize/init';
import { BoardAddComponent } from '../../../boards/components/board-add/board-add.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  user$ = this.storeFacade.user$;

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService) {}

  signOut(): void {
    this.storeFacade.signOut();
  }

  signUp(): void {
    this.modalService.create({
      nzContent: SignUpComponent,
      nzFooter: null,
      nzTitle: $localize`:@@SignUpModalTitle:Sign Up`,
      nzComponentParams: {
        buttonText: $localize`:@@SignUpButton:Sign Up`,
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
      nzTitle: $localize`:@@EditProfileModalTitle:Edit Profile`,
      nzComponentParams: {
        buttonText: $localize`:@@EditProfileSaveButton:Save`,
        isEditing: true,
      },
    });
  }

  showModal(): void {
    this.modalService.create({ nzContent: BoardAddComponent, nzWidth: 'null' });
  }
}
