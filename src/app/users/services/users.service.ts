import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { Observable } from 'rxjs';
import { User, UserParams } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(APIEndpoints.users);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${APIEndpoints.users}/${id}`);
  }

  public updateUser(id: string, userParams: UserParams): Observable<User> {
    return this.http.put<User>(`${APIEndpoints.users}/${id}`, userParams);
  }

  public deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${APIEndpoints.users}/${id}`);
  }
}
