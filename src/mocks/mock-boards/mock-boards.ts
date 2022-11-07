import { Board, BoardParams } from '../../app/boards/models/board.model';

export const mockBoard1: Board = {
  _id: '1',
  title: 'title 1',
  owner: 'user1',
  users: ['user1'],
};

export const mockBoard2: Board = {
  _id: '2',
  title: 'title 2',
  owner: 'user2',
  users: ['user1', 'user2'],
};

export const mockBoard3: Board = {
  _id: '3',
  title: 'title 3',
  owner: 'user3',
  users: ['user1', 'user3'],
};

export const mockBoardArray: Board[] = [mockBoard1, mockBoard2, mockBoard3];

export const paramForNewBoard: BoardParams = {
  title: 'title 3',
  owner: 'user3',
  users: ['user1', 'user3'],
};

export const updatedBoard: Board = {
  _id: '1',
  title: 'title new',
  owner: 'user new',
  users: ['user1', 'user2', 'user new'],
};

export const paramForUpdateBoard: BoardParams = {
  title: 'title new',
  owner: 'user new',
  users: ['user1', 'user2', 'user new'],
};
