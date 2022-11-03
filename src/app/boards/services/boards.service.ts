import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { Board, BoardParams } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(APIEndpoints.boards);
  }

  public createBoard(newBoard: BoardParams): Observable<Board> {
    return this.http.post<Board>(APIEndpoints.boards, newBoard);
  }

  public getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(`${APIEndpoints.boards}/${id}`);
  }

  public updBoard(id: string, boardParams: BoardParams): Observable<Board> {
    return this.http.put<Board>(`${APIEndpoints.boards}/${id}`, boardParams);
  }

  public delBoard(id: string): Observable<Board> {
    return this.http.delete<Board>(`${APIEndpoints.boards}/${id}`);
  }

  public getBoardsSet(listId: string[]): Observable<Board[]> {
    const params = new HttpParams().set('ids', listId.join());

    return this.http.get<Board[]>(APIEndpoints.boardsSet, { params });
  }

  public getBoardsByUser(id: string): Observable<Board[]> {
    return this.http.get<Board[]>(`${APIEndpoints.boardsSet}/${id}`);
  }
}
