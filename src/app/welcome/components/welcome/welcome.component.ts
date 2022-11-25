import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.storeFacade.getUsers();
  }
}
