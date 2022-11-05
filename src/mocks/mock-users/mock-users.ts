import { User, UserParams } from '../../app/users/models/user.model';

export const mockUser1: User = {
  _id: '1',
  name: 'test1',
  login: 'test1',
};

export const mockUser2: User = {
  _id: '2',
  name: 'test2',
  login: 'test2',
};

export const mockUser3: User = {
  _id: '3',
  name: 'test3',
  login: 'test3',
};

export const mockUserArray: User[] = [mockUser1, mockUser2, mockUser3];

export const updatedUser: User = {
  _id: '1',
  name: 'new name',
  login: 'new login',
};

export const paramForUpdateUser: UserParams = {
  name: 'new name',
  login: 'new login',
  password: 'new password',
};
