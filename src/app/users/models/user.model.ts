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

export interface Token {
  token: string;
}

export interface TokenPayload {
  exp: number;
  iat: number;
  id: string;
  login: string;
}
