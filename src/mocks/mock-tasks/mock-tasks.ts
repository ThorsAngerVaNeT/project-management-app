import {
  ColumnTask,
  ColumnTaskParams,
  ColumnTaskSetUpdateParams,
  ColumnTaskUpdateParams,
} from '@tasks/model/task.model';

export const mockTask1: ColumnTask = {
  _id: '1',
  title: 'title 1',
  order: 1,
  boardId: '1',
  columnId: '1',
  description: 'description 1',
  userId: 'user1',
  users: ['user1'],
};

export const mockTask2: ColumnTask = {
  _id: '2',
  title: 'title 2',
  order: 2,
  boardId: '1',
  columnId: '1',
  description: 'description 2',
  userId: 'user1',
  users: ['user1', 'user2'],
};

export const mockTask3: ColumnTask = {
  _id: '3',
  title: 'title 3',
  order: 3,
  boardId: '1',
  columnId: '1',
  description: 'description 3',
  userId: 'user1',
  users: ['user1', 'user2', 'user3'],
};

export const mockTaskArray: ColumnTask[] = [mockTask1, mockTask2, mockTask3];

export const paramForNewTask: ColumnTaskParams = {
  title: 'title 3',
  order: 3,
  description: 'description 3',
  userId: 'user1',
  users: ['user1', 'user2', 'user3'],
};

export const updatedTask: ColumnTask = {
  _id: '1',
  title: 'new title',
  order: 2,
  boardId: '1',
  columnId: '2',
  description: 'description 2',
  userId: 'user2',
  users: ['user1', 'user2'],
};

export const paramForUpdateTask: ColumnTaskUpdateParams = {
  title: 'new title',
  order: 2,
  columnId: '2',
  description: 'description 2',
  userId: 'user2',
  users: ['user1', 'user2'],
};

export const paramForUpdateTasksSet: ColumnTaskSetUpdateParams[] = [
  {
    _id: '1',
    order: 2,
    columnId: '2',
  },

  {
    _id: '2',
    order: 3,
    columnId: '2',
  },

  {
    _id: '3',
    order: 1,
    columnId: '2',
  },
];

export const updatedTasks: ColumnTask[] = [
  {
    _id: '1',
    title: 'title 1',
    order: 2,
    boardId: '1',
    columnId: '2',
    description: 'description 1',
    userId: 'user1',
    users: ['user1'],
  },

  {
    _id: '2',
    title: 'title 2',
    order: 3,
    boardId: '1',
    columnId: '2',
    description: 'description 2',
    userId: 'user1',
    users: ['user1', 'user2'],
  },

  {
    _id: '3',
    title: 'title 3',
    order: 1,
    boardId: '1',
    columnId: '2',
    description: 'description 3',
    userId: 'user1',
    users: ['user1', 'user2', 'user3'],
  },
];
