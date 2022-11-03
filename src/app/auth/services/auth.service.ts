import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SignInParams, SignUpParams, Token, User } from '../models/user.model';
import { APIEndpoints } from '../../core/enums/api-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(authParams: SignInParams): Observable<string> {
    return this.http.post<Token>(APIEndpoints.signIn, authParams).pipe(map((token) => token.token));
  }

  public signUp(authParams: SignUpParams): Observable<User> {
    return this.http.post<User>(APIEndpoints.signUp, authParams);
  }
}
