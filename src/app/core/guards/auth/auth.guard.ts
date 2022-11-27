import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreFacade } from '../../services/store-facade/store-facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  isLoggedIn$ = this.storeFacade.isLoggedIn$;

  constructor(private storeFacade: StoreFacade) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedIn$;
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.isLoggedIn$;
  }
}
