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
