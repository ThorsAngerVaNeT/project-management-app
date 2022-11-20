import { Point, PointParams, PointsSetUpdateParams, PointUpdateParams } from '@points/model/point.model';

export const mockPoint1: Point = {
  _id: '1',
  title: 'title 1',
  taskId: '1',
  boardId: '1',
  done: false,
};

export const mockPoint2: Point = {
  _id: '2',
  title: 'title 2',
  taskId: '1',
  boardId: '1',
  done: false,
};

export const mockPoint3: Point = {
  _id: '3',
  title: 'title 3',
  taskId: '1',
  boardId: '1',
  done: false,
};

export const mockPointArray: Point[] = [mockPoint1, mockPoint2, mockPoint3];

export const paramForNewPoint: PointParams = {
  title: 'title 3',
  taskId: '1',
  boardId: '1',
  done: false,
};

export const paramForUpdatePoint: PointUpdateParams = {
  title: 'new title',
  done: true,
};

export const updatedPoint: Point = {
  _id: '1',
  title: 'new title',
  taskId: '1',
  boardId: '1',
  done: true,
};

export const paramForUpdatePointsSet: PointsSetUpdateParams[] = [
  {
    _id: '1',
    done: true,
  },

  {
    _id: '2',
    done: true,
  },

  {
    _id: '3',
    done: true,
  },
];

export const updatedPoints: Point[] = [
  {
    _id: '1',
    title: 'title 1',
    taskId: '1',
    boardId: '1',
    done: true,
  },

  {
    _id: '2',
    title: 'title 2',
    taskId: '1',
    boardId: '1',
    done: true,
  },

  {
    _id: '3',
    title: 'title 3',
    taskId: '1',
    boardId: '1',
    done: true,
  },
];
