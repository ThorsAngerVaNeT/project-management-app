import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import '@angular/localize/init';
import { BoardAddComponent } from '@boards/components/board-add/board-add.component';

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

  showModal(): void {
    this.modalService.create({ nzContent: BoardAddComponent, nzWidth: 'null' });
  }
}
