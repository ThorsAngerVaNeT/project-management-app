import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { TaskFile } from '../model/file.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  public getFilesSet(listTaskIds: string[]): Observable<TaskFile[]> {
    const params = new HttpParams().set(APIParams.ids, listTaskIds.join());

    return this.http.get<TaskFile[]>(APIEndpoints.file, { params });
  }

  public getFilesByUser(userId: string): Observable<TaskFile[]> {
    const params = new HttpParams().set(APIParams.userId, userId);

    return this.http.get<TaskFile[]>(APIEndpoints.file, { params });
  }

  public getFilesByTask(taskId: string): Observable<TaskFile[]> {
    const params = new HttpParams().set(APIParams.taskId, taskId);

    return this.http.get<TaskFile[]>(APIEndpoints.file, { params });
  }

  public getFilesByBoard(boardId: string): Observable<TaskFile[]> {
    return this.http.get<TaskFile[]>(`${APIEndpoints.file}/${boardId}`);
  }

  public deleteFile(fileId: string): Observable<TaskFile> {
    return this.http.delete<TaskFile>(`${APIEndpoints.file}/${fileId}`);
  }

  public uploadFile(boardId: string, taskId: string, file: File): Observable<TaskFile> {
    const formData = new FormData();
    formData.append(APIParams.boardId, boardId);
    formData.append(APIParams.taskId, taskId);
    formData.append(APIParams.file, file);

    return this.http.post<TaskFile>(APIEndpoints.file, formData);
  }
}
