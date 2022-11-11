import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { Column, ColumnParams, ColumnSetUpdateParams, ColumnsSetParams } from '../models/column.model';
import { Board } from '../../boards/models/board.model';
import { User } from '../../users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient) {}

  private getColumnUrl(boardId: Board['_id'], columnId: Column['_id'] = ''): string {
    const columnEndpoint = columnId ? `/${columnId}` : '';
    return `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}${columnEndpoint}`;
  }

  public getColumns(boardId: Board['_id']): Observable<Column[]> {
    return this.http.get<Column[]>(this.getColumnUrl(boardId));
  }

  public getColumnsSet(listColumnIds: Column['_id'][]): Observable<Column[]> {
    const params = new HttpParams().set(APIParams.ids, listColumnIds.join());

    return this.http.get<Column[]>(APIEndpoints.columnsSet, { params });
  }

  public getColumnsByUser(userId: User['_id']): Observable<Column[]> {
    const params = new HttpParams().set(APIParams.userId, userId);

    return this.http.get<Column[]>(APIEndpoints.columnsSet, { params });
  }

  public getColumn(boardId: Board['_id'], columnId: Column['_id']): Observable<Column> {
    return this.http.get<Column>(this.getColumnUrl(boardId, columnId));
  }

  public createColumn(boardId: Board['_id'], newColumn: ColumnParams): Observable<Column> {
    return this.http.post<Column>(this.getColumnUrl(boardId), newColumn);
  }

  public createColumnsSet(listColumnsSetParams: ColumnsSetParams[]): Observable<Column[]> {
    return this.http.post<Column[]>(APIEndpoints.columnsSet, listColumnsSetParams);
  }

  public updateColumn(boardId: Board['_id'], columnId: Column['_id'], columnParams: ColumnParams): Observable<Column> {
    return this.http.put<Column>(this.getColumnUrl(boardId, columnId), columnParams);
  }

  public updateColumnsSet(listColumnParams: ColumnSetUpdateParams[]): Observable<Column[]> {
    return this.http.patch<Column[]>(APIEndpoints.columnsSet, listColumnParams);
  }

  public deleteColumn(boardId: Board['_id'], columnId: Column['_id']): Observable<Column> {
    return this.http.delete<Column>(this.getColumnUrl(boardId, columnId));
  }
}
