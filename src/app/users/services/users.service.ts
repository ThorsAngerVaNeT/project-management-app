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

  public getUser(id: User['_id']): Observable<User> {
    return this.http.get<User>(`${APIEndpoints.users}/${id}`);
  }

  public updateUser(id: User['_id'], userParams: UserParams): Observable<User> {
    return this.http.put<User>(`${APIEndpoints.users}/${id}`, userParams);
  }

  public deleteUser(id: User['_id']): Observable<User> {
    return this.http.delete<User>(`${APIEndpoints.users}/${id}`);
  }
}
