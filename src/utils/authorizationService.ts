import { AuthorizeData, TokenRequest } from '@/models/authorization';
import { User } from '@/models/user';
import axios from 'axios';

export interface AuthorizationServiceOptions {
  authApi: string;
  app: string;
  redirectUrl: string;
  apiKey?: string;
  websocketEndpoint?: string;
}

export class AuthorizationService {
  constructor(private readonly options: AuthorizationServiceOptions) {}

  public encodeAuthorizeData(authorizeData: AuthorizeData): string {
    return btoa(JSON.stringify(authorizeData));
  }
  public decodeAuthorizeData(rawAuthorizeData: string): AuthorizeData | null {
    try {
      return rawAuthorizeData != '' && rawAuthorizeData != null ? JSON.parse(atob(rawAuthorizeData)) : null;
    } catch {
      return null;
    }
  }

  public createAuthorizeUrl(): string {
    const encodedAuthorizationData = this.encodeAuthorizeData({
      app: this.options.app,
      redirectUrl: this.options.redirectUrl,
    });

    const params = new URLSearchParams();
    params.append('appData', encodedAuthorizationData);

    return this.options.authApi + '/authorize?' + params.toString();
  }

  public async authorize(authCode: string): Promise<User> {
    return axios
      .post<User>(this.options.authApi + '/api/authorize', {
        authCode: authCode,
        app: this.options.app,
        apiKey: this.options.apiKey,
        websocketEndpoint: this.options.websocketEndpoint,
      } satisfies TokenRequest)
      .then((res) => res.data);
  }
}
