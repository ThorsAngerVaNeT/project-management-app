import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StoreFacade } from '../../services/store-facade/store-facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  isLoggedIn$ = this.storeFacade.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        return this.router.parseUrl('/welcome');
      }
      this.storeFacade.getUserInfo();
      return true;
    }),
  );

  constructor(private router: Router, private storeFacade: StoreFacade) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedIn$;
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.isLoggedIn$;
  }
}
