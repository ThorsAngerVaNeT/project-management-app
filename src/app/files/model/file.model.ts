import { Board } from '@boards/model/board.model';
import { ColumnTask } from '@tasks/model/task.model';

export interface TaskFile {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface UploadFileParams {
  boardId: Board['_id'];
  taskId: ColumnTask['_id'];
  file: File;
  filename: string;
}

export interface UploadFileParamsWithPath extends UploadFileParams {
  path: string;
}
