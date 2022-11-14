import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoading = new Subject<boolean>();

  public isLoading$ = this._isLoading.asObservable();

  public show(): void {
    this._isLoading.next(true);
  }

  public hide(): void {
    this._isLoading.next(false);
  }
}
