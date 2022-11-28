import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { StoreFacade } from '@core/services/store-facade/store-facade';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BoardAddComponent } from '@boards/components/board-add/board-add.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  user$ = this.storeFacade.user$;

  burgerVisible = false;

  constructor(
    private storeFacade: StoreFacade,
    private modalService: NzModalService,
    private router: Router,
    private elementRef: ElementRef,
    private translateService: TranslateService,
  ) {}

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
    this.modalService.create({
      nzTitle: this.translateService.instant('CreateBoardModalTitle'),
      nzContent: BoardAddComponent,
      nzWidth: 'null',
      nzClassName: 'form-scrollable',
      nzStyle: { top: '40px' },
    });
  }

  @HostListener('document:click', ['$event'])
  closeClickedOutsideBurger(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) this.burgerVisible = false;
  }
}
