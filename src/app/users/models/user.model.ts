export interface User {
  _id: string;
  name: string;
  login: string;
}

export interface UserParams {
  name: string;
  login: string;
  password: string;
}

export interface SignInParams {
  login: string;
  password: string;
}

export interface APIToken {
  token: string;
}
