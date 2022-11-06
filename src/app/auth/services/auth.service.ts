import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { SignInParams, UserParams, APIToken, User } from '../../users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(authParams: SignInParams): Observable<string> {
    return this.http.post<APIToken>(APIEndpoints.signIn, authParams).pipe(map((response) => response.token));
  }

  public signUp(authParams: UserParams): Observable<User> {
    return this.http.post<User>(APIEndpoints.signUp, authParams);
  }
}
