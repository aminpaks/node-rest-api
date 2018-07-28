export interface AuthRequestPayload {
  email: string;
  password: string;
  token?: string;
}

export interface JWTPayload {
  iat: number;
  exp: number;
  userId: number;
}
