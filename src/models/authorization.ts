export interface AuthorizeData {
  app: string;
  redirectUrl: string;
}

export interface TokenRequest {
  authCode: string;
  app: string;
}
