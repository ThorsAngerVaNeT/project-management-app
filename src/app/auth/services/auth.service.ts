import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SignInParams, UserParams, Token, User } from 'src/app/users/models/user.model';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(authParams: SignInParams): Observable<string> {
    return this.http.post<Token>(APIEndpoints.signIn, authParams).pipe(map((token) => token.token));
  }

  public signUp(authParams: UserParams): Observable<User> {
    return this.http.post<User>(APIEndpoints.signUp, authParams);
  }
}
