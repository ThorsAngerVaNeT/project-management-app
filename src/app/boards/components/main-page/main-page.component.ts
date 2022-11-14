import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  boards$ = this.storeFacade.boards$;

  constructor(private storeFacade: StoreFacade) {}

  ngOnInit(): void {
    this.storeFacade.getBoards();
    this.storeFacade.getUsers();
  }
}
