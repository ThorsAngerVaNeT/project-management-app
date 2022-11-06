import { Column, ColumnParams, ColumnSetUpdateParams, ColumnsSetParams } from '../../app/columns/models/columns.model';

export const mockColumn1: Column = {
  _id: '1',
  title: 'title 1',
  order: 1,
  boardId: '1',
};

export const mockColumn2: Column = {
  _id: '2',
  title: 'title 2',
  order: 2,
  boardId: '1',
};

export const mockColumn3: Column = {
  _id: '3',
  title: 'title 3',
  order: 3,
  boardId: '1',
};

export const mockColumnArray: Column[] = [mockColumn1, mockColumn2, mockColumn3];

export const paramForNewColumn: ColumnParams = {
  title: 'title 3',
  order: 1,
};

export const paramForNewColumnsSet: ColumnsSetParams[] = [
  {
    title: 'title 1',
    order: 1,
    boardId: '1',
  },
  {
    title: 'title 2',
    order: 2,
    boardId: '1',
  },
  {
    title: 'title 3',
    order: 1,
    boardId: '1',
  },
];

export const updatedColumn: Column = {
  _id: '1',
  title: 'title new',
  order: 2,
  boardId: '1',
};

export const paramForUpdateColumn: ColumnParams = {
  title: 'title new',
  order: 2,
};

export const paramForUpdateColumnsSet: ColumnSetUpdateParams[] = [
  {
    _id: '1',
    order: 2,
  },
  {
    _id: '2',
    order: 3,
  },
  {
    _id: '3',
    order: 1,
  },
];

export const updatedColumns: Column[] = [
  {
    _id: '1',
    title: 'title 1',
    order: 2,
    boardId: '1',
  },

  {
    _id: '2',
    title: 'title 2',
    order: 3,
    boardId: '1',
  },

  {
    _id: '3',
    title: 'title 3',
    order: 1,
    boardId: '1',
  },
];
