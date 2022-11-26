import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { concatLatestFrom } from '@ngrx/effects';
import { map, Observable } from 'rxjs';
import { StoreFacade } from '../../services/store-facade/store-facade';

@Injectable({
  providedIn: 'root',
})
export class BoardUserGuard implements CanActivate, CanLoad {
  isBoardUser$ = this.storeFacade.user$.pipe(
    concatLatestFrom(() => this.storeFacade.boardDetail$),
    map(([{ _id: userId }, { board }]) => {
      const userIds = board?.users.map((boardUser) => boardUser._id);
      if (board?.owner._id === userId || userIds?.includes(userId)) return true;
      return this.router.parseUrl('/boards');
    }),
  );

  constructor(private router: Router, private storeFacade: StoreFacade) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isBoardUser$;
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.isBoardUser$;
  }
}
