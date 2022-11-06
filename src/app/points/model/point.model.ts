export interface Point {
  _id: string;
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export interface PointParams {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export interface PointUpdateParams {
  title: string;
  done: boolean;
}

export interface PointsSetUpdateParams {
  _id: string;
  done: boolean;
}
