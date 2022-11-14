import { User } from '../../users/models/user.model';

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface BoardParams {
  title: string;
  owner: string;
  users: string[];
}

export interface BoardWithUsers {
  _id: string;
  title: string;
  owner: User;
  users: User[];
}
