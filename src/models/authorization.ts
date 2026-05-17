export interface AuthorizeData {
  app: string;
  redirectUrl: string;
}

export interface TokenRequest {
  authCode: string;
  app: string;
  apiKey?: string | null;
  webhookUrl?: string | null;
}
