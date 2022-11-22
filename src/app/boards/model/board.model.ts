import { ColumnWithTasks } from '@columns/model/column.model';
import { User } from '@users/model/user.model';

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface BoardParams {
  title: string;
  owner: string;
  users: string[];
}

export interface BoardWithUsers {
  _id: string;
  title: string;
  owner: User;
  users: User[];
}

export interface BoardDetailViewModel {
  board: BoardWithUsers | null;
  columns: ColumnWithTasks[];
}

export interface BoardParamsWithImage extends Omit<BoardParams, 'owner'> {
  file: File;
}
