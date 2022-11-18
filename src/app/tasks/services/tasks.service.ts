import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { ColumnTask, ColumnTaskParams, ColumnTaskUpdateParams, ColumnTaskSetUpdateParams } from '../model/task.model';
import { Board } from '@boards/model/board.model';
import { Column } from '@columns/model/column.model';
import { User } from '../../users/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private getTaskUrl(boardId: Board['_id'], columnId: Column['_id'], taskId: ColumnTask['_id'] = ''): string {
    const taskEndpoint = taskId ? `/${taskId}` : '';
    return `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}${taskEndpoint}`;
  }

  public getTasks(boardId: Board['_id'], columnId: Column['_id']): Observable<ColumnTask[]> {
    return this.http.get<ColumnTask[]>(this.getTaskUrl(boardId, columnId));
  }

  public getTasksSet(listTaskIds: ColumnTask['_id'][]): Observable<ColumnTask[]> {
    const params = new HttpParams().set(APIParams.ids, listTaskIds.join());

    return this.http.get<ColumnTask[]>(APIEndpoints.tasksSet, { params });
  }

  public getTasksByUser(userId: User['_id']): Observable<ColumnTask[]> {
    const params = new HttpParams().set(APIParams.userId, userId);

    return this.http.get<ColumnTask[]>(APIEndpoints.tasksSet, { params });
  }

  public getTasksByBoard(boardId: Board['_id']): Observable<ColumnTask[]> {
    return this.http.get<ColumnTask[]>(`${APIEndpoints.tasksSet}/${boardId}`);
  }

  public getTasksBySearchString(searchString: string): Observable<ColumnTask[]> {
    const params = new HttpParams().set(APIParams.search, searchString);

    return this.http.get<ColumnTask[]>(APIEndpoints.tasksSet, { params });
  }

  public getTask(boardId: Board['_id'], columnId: Column['_id'], taskId: ColumnTask['_id']): Observable<ColumnTask> {
    return this.http.get<ColumnTask>(this.getTaskUrl(boardId, columnId, taskId));
  }

  public createTask(boardId: Board['_id'], columnId: Column['_id'], newTask: ColumnTaskParams): Observable<ColumnTask> {
    return this.http.post<ColumnTask>(this.getTaskUrl(boardId, columnId), newTask);
  }

  public updateTask(
    boardId: Board['_id'],
    columnId: Column['_id'],
    taskId: ColumnTask['_id'],
    taskParams: ColumnTaskUpdateParams,
  ): Observable<ColumnTask> {
    return this.http.put<ColumnTask>(this.getTaskUrl(boardId, columnId, taskId), taskParams);
  }

  public updateTasksSet(listTaskParams: ColumnTaskSetUpdateParams[]): Observable<ColumnTask[]> {
    return this.http.patch<ColumnTask[]>(APIEndpoints.tasksSet, listTaskParams);
  }

  public deleteTask(boardId: Board['_id'], columnId: Column['_id'], taskId: ColumnTask['_id']): Observable<ColumnTask> {
    return this.http.delete<ColumnTask>(this.getTaskUrl(boardId, columnId, taskId));
  }
}
