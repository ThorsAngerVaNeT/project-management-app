import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { Board, BoardParams } from '../model/board.model';
import { User } from '@users/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(APIEndpoints.boards);
  }

  public getBoardsSet(listBoardIds: Board['_id'][]): Observable<Board[]> {
    const params = new HttpParams().set(APIParams.ids, listBoardIds.join());

    return this.http.get<Board[]>(APIEndpoints.boardsSet, { params });
  }

  public getBoardsByUser(userId: User['_id']): Observable<Board[]> {
    return this.http.get<Board[]>(`${APIEndpoints.boardsSet}/${userId}`);
  }

  public getBoard(boardId: Board['_id']): Observable<Board> {
    return this.http.get<Board>(`${APIEndpoints.boards}/${boardId}`);
  }

  public createBoard(newBoard: BoardParams): Observable<Board> {
    return this.http.post<Board>(APIEndpoints.boards, newBoard);
  }

  public updateBoard(boardId: Board['_id'], boardParams: BoardParams): Observable<Board> {
    return this.http.put<Board>(`${APIEndpoints.boards}/${boardId}`, boardParams);
  }

  public deleteBoard(boardId: Board['_id']): Observable<Board> {
    return this.http.delete<Board>(`${APIEndpoints.boards}/${boardId}`);
  }
}
