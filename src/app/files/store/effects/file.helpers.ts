import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Board } from '@boards/model/board.model';
import { TaskFile } from '../../model/file.model';

export const generateBoardCoverFilename = (boardId: Board['_id'] | number, filename: string): string =>
  `${boardId}-${Date.now()}.${filename.split('.').at(-1)}`;

export const getFileUrl = (path: TaskFile['path']): string => `${environment.API_URL}${path}`;

export const getPreloadImage$ = (file: TaskFile): Observable<HTMLImageElement> =>
  new Observable((subscriber) => {
    const image = new Image();
    image.src = getFileUrl(file.path);
    image.onload = (): void => {
      subscriber.next(image);
      subscriber.complete();
    };
    image.onerror = (): void => {
      subscriber.next(image);
      subscriber.complete();
    };
  });

export const fileToBase64 = (
  boardId: Board['_id'],
  file: File,
): Observable<{ boardId: Board['_id']; path: string; file: File }> =>
  new Observable((subscriber) => {
    const reader = new FileReader();

    reader.onloadend = (): void => {
      subscriber.next({ boardId, path: `${reader.result}`, file });
      subscriber.complete();
    };

    reader.readAsDataURL(file);
  });
