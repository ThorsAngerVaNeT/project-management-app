import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndpoints } from '@core/enums/api-endpoints.enum';
import { APIParams } from '@core/enums/api-params.enum';
import { TaskFile } from '../model/file.model';
import { User } from '../../users/models/user.model';
import { Board } from '../../boards/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  public getFilesSet(listFileIds: TaskFile['_id'][]): Observable<TaskFile[]> {
    const params = new HttpParams().set(APIParams.ids, listFileIds.join());

    return this.http.get<TaskFile[]>(APIEndpoints.file, { params });
  }

  public getFilesByUser(userId: User['_id']): Observable<TaskFile[]> {
    const params = new HttpParams().set(APIParams.userId, userId);

    return this.http.get<TaskFile[]>(APIEndpoints.file, { params });
  }

  public getFilesByTask(taskId: TaskFile['_id']): Observable<TaskFile[]> {
    const params = new HttpParams().set(APIParams.taskId, taskId);

    return this.http.get<TaskFile[]>(APIEndpoints.file, { params });
  }

  public getFilesByBoard(boardId: Board['_id']): Observable<TaskFile[]> {
    return this.http.get<TaskFile[]>(`${APIEndpoints.file}/${boardId}`);
  }

  public deleteFile(fileId: TaskFile['_id']): Observable<TaskFile> {
    return this.http.delete<TaskFile>(`${APIEndpoints.file}/${fileId}`);
  }

  public uploadFile(boardId: Board['_id'], taskId: TaskFile['_id'], file: File): Observable<TaskFile> {
    const formData = new FormData();
    formData.append(APIParams.boardId, boardId);
    formData.append(APIParams.taskId, taskId);
    formData.append(APIParams.file, file);

    return this.http.post<TaskFile>(APIEndpoints.file, formData);
  }
}
