import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { Column, ColumnParams, ColumnSetUpdParams, ColumnsSetParams } from '../models/columns.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient) {}

  public getColumns(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(`${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}`);
  }

  public createColumns(boardId: string, newColumn: ColumnParams): Observable<Column> {
    return this.http.post<Column>(`${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}`, newColumn);
  }

  public getColumn(boardId: string, columnId: string): Observable<Column> {
    return this.http.get<Column>(`${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}`);
  }

  public updColumn(boardId: string, columnId: string, columnParams: ColumnParams): Observable<Column> {
    return this.http.put<Column>(`${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}`, columnParams);
  }

  public delColumn(boardId: string, columnId: string): Observable<Column> {
    return this.http.delete<Column>(`${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}`);
  }

  public getColumnsSet(listColumnsId: string[]): Observable<Column[]> {
    const params = new HttpParams().set('ids', listColumnsId.join());

    return this.http.get<Column[]>(APIEndpoints.columnsSet, { params });
  }

  public getColumnsByUser(userId: string): Observable<Column[]> {
    const params = new HttpParams().set('userId', userId);

    return this.http.get<Column[]>(APIEndpoints.columnsSet, { params });
  }

  public updColumnsSet(listColumnParams: ColumnSetUpdParams[]): Observable<Column[]> {
    return this.http.patch<Column[]>(APIEndpoints.columnsSet, listColumnParams);
  }

  public createColumnsSet(listColumnsSetParams: ColumnsSetParams[]): Observable<Column[]> {
    return this.http.post<Column[]>(APIEndpoints.columnsSet, listColumnsSetParams);
  }
}
