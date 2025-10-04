import { AuthorizeData, TokenRequest } from '@/models/authorization';
import { User } from '@/models/user';
import axios from 'axios';

export class AuthorizationService {
  constructor(
    private readonly authApi: string,
    private readonly app: string,
    private readonly redirectUrl: string,
    private readonly apiKey?: string
  ) {}

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
      app: this.app,
      redirectUrl: this.redirectUrl,
    });

    const params = new URLSearchParams();
    params.append('appData', encodedAuthorizationData);

    return this.authApi + '/authorize?' + params.toString();
  }

  public async authorize(authCode: string): Promise<User> {
    return axios
      .post<User>(this.authApi + '/api/authorize', {
        authCode: authCode,
        app: this.app,
        apiKey: this.apiKey,
      } as TokenRequest)
      .then((res) => res.data);
  }
}
