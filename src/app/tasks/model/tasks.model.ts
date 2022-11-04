export interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface TaskParams {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface TaskSetUpdateParams {
  _id: string;
  order: number;
  columnId: string;
}
