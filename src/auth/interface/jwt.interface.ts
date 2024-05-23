type TokenType = 'Bearer';
type ScopeType = 'write' | 'read' | 'write read';

export interface Payload {
  sub: string;
  iss: string;
  iat: number;
  email: string;
  username: string;
}

export interface JwtPayloadResponse {
  access_token: string;
  token_type: TokenType;
  expires_in: number;
  refresh_token?: string;
  scope?: ScopeType;
}
