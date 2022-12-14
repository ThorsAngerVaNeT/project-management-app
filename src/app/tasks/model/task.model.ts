import { User } from '@users/model/user.model';

export interface ColumnTask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface ColumnTaskParams {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface ColumnTaskUpdateParams {
  title: string;
  order: number;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface ColumnTaskSetUpdateParams {
  _id: string;
  order: number;
  columnId: string;
}

export interface ColumnTaskWithUsers extends Omit<ColumnTask, 'users'> {
  user: User;
  users: User[];
  selected: boolean;
}

export interface ColumnTasksWithColumnId {
  columnId: string;
  tasks: ColumnTaskWithUsers[];
}
