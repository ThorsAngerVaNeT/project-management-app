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
