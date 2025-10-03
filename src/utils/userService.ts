import { SimpleUser, User, UserVariable } from '@/models/user';
import axios from 'axios';

export class UserService {
  private readonly cache = new Map<string, User>();

  constructor(private readonly authApi: string) {}

  public addUserToCache(sessionId: string, user: User): void {
    this.cache.set(sessionId, user);
  }

  public getUserFromCache(sessionId: string): User | undefined {
    return this.cache.get(sessionId);
  }

  public updateUserWithVariables(user: User, userVariable: UserVariable): User {
    return {
      userId: user.userId,
      username: user.username,
      ...userVariable,
    };
  }

  public async getUserData(userId: string): Promise<SimpleUser> {
    return axios.get<SimpleUser>(this.authApi + '/api/user?userId=' + userId).then((res) => res.data);
  }
}
