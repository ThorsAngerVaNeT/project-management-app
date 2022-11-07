import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { ColumnTask, ColumnTaskParams, ColumnTaskUpdateParams, ColumnTaskSetUpdateParams } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private getTaskUrl(boardId: string, columnId: string, taskId: string = ''): string {
    const taskEndpoint = taskId ? `/${taskId}` : '';
    return `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}${taskEndpoint}`;
  }

  public getTasks(boardId: string, columnId: string): Observable<ColumnTask[]> {
    return this.http.get<ColumnTask[]>(this.getTaskUrl(boardId, columnId));
  }

  public getTasksSet(listTaskIds: string[]): Observable<ColumnTask[]> {
    const params = new HttpParams().set(APIParams.ids, listTaskIds.join());

    return this.http.get<ColumnTask[]>(APIEndpoints.tasksSet, { params });
  }

  public getTasksByUser(userId: string): Observable<ColumnTask[]> {
    const params = new HttpParams().set(APIParams.userId, userId);

    return this.http.get<ColumnTask[]>(APIEndpoints.tasksSet, { params });
  }

  public getTasksByBoard(boardId: string): Observable<ColumnTask[]> {
    return this.http.get<ColumnTask[]>(`${APIEndpoints.tasksSet}/${boardId}`);
  }

  public getTasksBySearchString(searchString: string): Observable<ColumnTask[]> {
    const params = new HttpParams().set(APIParams.search, searchString);

    return this.http.get<ColumnTask[]>(APIEndpoints.tasksSet, { params });
  }

  public getTask(boardId: string, columnId: string, taskId: string): Observable<ColumnTask> {
    return this.http.get<ColumnTask>(this.getTaskUrl(boardId, columnId, taskId));
  }

  public createTask(boardId: string, columnId: string, newTask: ColumnTaskParams): Observable<ColumnTask> {
    return this.http.post<ColumnTask>(this.getTaskUrl(boardId, columnId), newTask);
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    taskParams: ColumnTaskUpdateParams,
  ): Observable<ColumnTask> {
    return this.http.put<ColumnTask>(this.getTaskUrl(boardId, columnId, taskId), taskParams);
  }

  public updateTasksSet(listTaskParams: ColumnTaskSetUpdateParams[]): Observable<ColumnTask[]> {
    return this.http.patch<ColumnTask[]>(APIEndpoints.tasksSet, listTaskParams);
  }

  public deleteTask(boardId: string, columnId: string, taskId: string): Observable<ColumnTask> {
    return this.http.delete<ColumnTask>(this.getTaskUrl(boardId, columnId, taskId));
  }
}
