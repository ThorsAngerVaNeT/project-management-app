import { TaskFile } from '@files/model/file.model';

export const mockFile1: TaskFile = {
  _id: '1',
  name: 'name 1',
  taskId: '1',
  boardId: '1',
  path: '//path/to/name/1',
};

export const mockFile2: TaskFile = {
  _id: '2',
  name: 'name 2',
  taskId: '1',
  boardId: '1',
  path: '//path/to/name/2',
};

export const mockFile3: TaskFile = {
  _id: '3',
  name: 'name 3',
  taskId: '1',
  boardId: '1',
  path: '//path/to/name/3',
};

export const mockFileArray: TaskFile[] = [mockFile1, mockFile2, mockFile3];

export const newFile: File = new File(['test'], 'test.png', { type: 'image/png' });
