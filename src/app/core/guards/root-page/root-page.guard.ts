import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StoreFacade } from '../../services/store-facade/store-facade';

@Injectable({
  providedIn: 'root',
})
export class RootPageGuard implements CanActivate {
  isLoggedIn$ = this.storeFacade.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      return isLoggedIn ? this.router.parseUrl('/boards') : true;
    }),
  );

  constructor(private router: Router, private storeFacade: StoreFacade) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn$;
  }
}
