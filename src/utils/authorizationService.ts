import { AuthorizeData, AuthorizeTokenResponse, TokenRequest } from '@/models/authorization';
import { GetUserResponse, User, UserRequest } from '@/models/user';
import axios from 'axios';

export class AuthorizationService {
  constructor(
    private readonly authApi: string,
    private readonly app: string,
    private readonly redirectUrl: string
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

  public async authorizeToken(authCode: string): Promise<AuthorizeTokenResponse> {
    return axios
      .post<AuthorizeTokenResponse>(this.authApi + '/api/authorize/token', {
        authCode: authCode,
        app: this.app,
      } as TokenRequest)
      .then((res) => res.data);
  }

  public async authorizeUser(authCode: string): Promise<User> {
    return axios
      .post<User>(this.authApi + '/api/authorize/user', {
        authCode: authCode,
        app: this.app,
      } as TokenRequest)
      .then((res) => res.data);
  }

  public async getUser(session: string): Promise<GetUserResponse> {
    return axios
      .post<GetUserResponse>(this.authApi + '/api/user', {
        session,
        app: this.app,
      } as UserRequest)
      .then((res) => res.data);
  }

  public async logout(session: string): Promise<void> {
    return axios
      .post<void>(this.authApi + '/api/logout', {
        session,
        app: this.app,
      } as UserRequest)
      .then((res) => res.data);
  }
}
