import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { concatMap, filter, map, Observable, take, tap } from 'rxjs';
import { AuthState } from '@auth/store/reducers/auth.reducer';
import { Board } from '@boards/model/board.model';
import { StoreFacade } from '../../services/store-facade/store-facade';

@Injectable({
  providedIn: 'root',
})
export class BoardUserGuard implements CanActivate, CanLoad {
  user!: AuthState;

  boardId!: Board['_id'];

  isBoardUser$ = this.checkStore().pipe(
    concatMap(() => this.storeFacade.user$),
    concatMap((user) => {
      this.user = user;
      return this.storeFacade.boardId$;
    }),
    concatMap((boardId) => {
      this.boardId = boardId;
      return this.storeFacade.boardEntities$;
    }),
    map((boardEntities) => {
      const board = boardEntities[this.boardId];

      if (!board) {
        return this.router.parseUrl('/404');
      }

      if (board?.owner === this.user._id || board?.users?.includes(this.user._id)) {
        return true;
      }

      this.notification.create(
        'warning',
        this.translateService.instant('AccessDenied'),
        this.translateService.instant('AccessDeniedRedirect'),
      );

      this.router.navigateByUrl('/boards');
      return false;
    }),
  );

  constructor(
    private router: Router,
    private storeFacade: StoreFacade,
    private notification: NzNotificationService,
    private translateService: TranslateService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isBoardUser$;
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.isBoardUser$;
  }

  checkStore(): Observable<boolean> {
    return this.storeFacade.boardsLoaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.storeFacade.getBoards();
        }
      }),
      filter((loaded) => loaded),
      take(1),
    );
  }
}
