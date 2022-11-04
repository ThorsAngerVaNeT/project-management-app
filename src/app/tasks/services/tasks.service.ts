import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { Task, TaskParams, TaskUpdateParams, TaskSetUpdateParams } from '../model/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private getTasksUrl(boardId: string, columnId: string, taskId: string = ''): string {
    const taskEndpoint = taskId ? `/${taskId}` : '';
    return `${APIEndpoints.boards}/${boardId}/${APIEndpoints.columns}/${columnId}/${APIEndpoints.tasks}${taskEndpoint}`;
  }

  public getTasks(boardId: string, columnId: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.getTasksUrl(boardId, columnId));
  }

  public getTasksSet(listTaskIds: string[]): Observable<Task[]> {
    const params = new HttpParams().set(APIParams.ids, listTaskIds.join());

    return this.http.get<Task[]>(APIEndpoints.tasksSet, { params });
  }

  public getTasksByUser(userId: string): Observable<Task[]> {
    const params = new HttpParams().set(APIParams.userId, userId);

    return this.http.get<Task[]>(APIEndpoints.tasksSet, { params });
  }

  public getTasksByBoard(boardId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${APIEndpoints.tasksSet}/${boardId}`);
  }

  public getTasksBySearchString(searchString: string): Observable<Task[]> {
    const params = new HttpParams().set(APIParams.search, searchString);

    return this.http.get<Task[]>(APIEndpoints.tasksSet, { params });
  }

  public getTask(boardId: string, columnId: string, taskId: string): Observable<Task> {
    return this.http.get<Task>(this.getTasksUrl(boardId, columnId, taskId));
  }

  public createTask(boardId: string, columnId: string, newTask: TaskParams): Observable<Task> {
    return this.http.post<Task>(this.getTasksUrl(boardId, columnId), newTask);
  }

  public updateTask(boardId: string, columnId: string, taskId: string, taskParams: TaskUpdateParams): Observable<Task> {
    return this.http.put<Task>(this.getTasksUrl(boardId, columnId, taskId), taskParams);
  }

  public updateTasksSet(listTaskParams: TaskSetUpdateParams[]): Observable<Task[]> {
    return this.http.patch<Task[]>(APIEndpoints.tasksSet, listTaskParams);
  }

  public deleteTask(boardId: string, columnId: string, taskId: string): Observable<Task> {
    return this.http.delete<Task>(this.getTasksUrl(boardId, columnId, taskId));
  }
}
