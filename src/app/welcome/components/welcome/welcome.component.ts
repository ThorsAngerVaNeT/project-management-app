import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreFacade } from '../../../core/services/store-facade/store-facade';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  user$ = this.storeFacade.user$;

  constructor(private storeFacade: StoreFacade) {}

  login(): void {
    this.storeFacade.signIn({ login: 'IMask', password: 'Tesla4ever' });
  }

  logout(): void {
    this.storeFacade.signOut();
  }
}
