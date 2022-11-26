import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import '@angular/localize/init';
import { BoardAddComponent } from '@boards/components/board-add/board-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  user$ = this.storeFacade.user$;

  burgerVisible = false;

  constructor(private storeFacade: StoreFacade, private modalService: NzModalService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => (this.burgerVisible = false));
  }

  burgerToggle(): void {
    this.burgerVisible = !this.burgerVisible;
  }

  signOut(): void {
    this.storeFacade.signOut();
  }

  showModal(): void {
    this.modalService.create({ nzContent: BoardAddComponent, nzWidth: 'null' });
  }
}
