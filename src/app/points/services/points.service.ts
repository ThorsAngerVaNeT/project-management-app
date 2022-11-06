import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { Point, PointParams, PointsSetUpdateParams, PointUpdateParams } from '../model/point.model';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  constructor(private http: HttpClient) {}

  public getPointsSet(listPointIds: string[]): Observable<Point[]> {
    const params = new HttpParams().set(APIParams.ids, listPointIds.join());

    return this.http.get<Point[]>(APIEndpoints.points, { params });
  }

  public getPointsByUser(userId: string): Observable<Point[]> {
    const params = new HttpParams().set(APIParams.userId, userId);

    return this.http.get<Point[]>(APIEndpoints.points, { params });
  }

  public getPointsByTask(taskId: string): Observable<Point[]> {
    return this.http.get<Point[]>(`${APIEndpoints.points}/${taskId}`);
  }

  public createPoint(newPoint: PointParams): Observable<Point> {
    return this.http.post<Point>(APIEndpoints.points, newPoint);
  }

  public updatePoint(pointId: string, pointParams: PointUpdateParams): Observable<Point> {
    return this.http.patch<Point>(`${APIEndpoints.points}/${pointId}`, pointParams);
  }

  public updatePointsSet(listPointParams: PointsSetUpdateParams[]): Observable<Point[]> {
    return this.http.patch<Point[]>(APIEndpoints.points, listPointParams);
  }

  public deletePoint(pointId: string): Observable<Point> {
    return this.http.delete<Point>(`${APIEndpoints.points}/${pointId}`);
  }
}
