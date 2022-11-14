import { ColumnTask } from '@tasks/model/task.model';

export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ColumnParams {
  title: string;
  order: number;
}

export interface ColumnsSetParams {
  title: string;
  order: number;
  boardId: string;
}

export interface ColumnSetUpdateParams {
  _id: string;
  order: number;
}

export interface ColumnWithTasks extends Column {
  tasks: ColumnTask[];
}
