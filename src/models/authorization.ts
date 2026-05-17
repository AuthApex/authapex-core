export interface AuthorizeData {
  app: string;
  redirectUrl: string;
}

export interface TokenRequest {
  authCode: string;
  app: string;
  apiKey?: string | null;
  websocketEndpoint?: string | null;
}
