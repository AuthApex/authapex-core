import { User, UserVariable } from '@/models/user';

export class UserService {
  private readonly cache = new Map<string, User>();

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
}
