export interface AuthorizeData {
  app: string;
  redirectUrl: string;
}

export interface AuthorizeTokenResponse {
  session: string;
  expiresAt: string;
}

export interface TokenRequest {
  authCode: string;
  app: string;
}
