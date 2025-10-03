import { SimpleUser, User, UserVariable } from '@/models/user';
import axios from 'axios';
import { addHours, isAfter } from 'date-fns';

export class UserService {
  private cacheTime: Date = new Date();

  private readonly cache = new Map<string, User>();
  private readonly simpleUserCache = new Map<string, SimpleUser>();

  constructor(private readonly authApi: string) {}

  public addUserToCache(sessionId: string, user: User): void {
    this.checkAndInvalidateOldCache();
    this.cache.set(sessionId, user);
  }

  public getUserFromCache(sessionId: string): User | undefined {
    this.checkAndInvalidateOldCache();
    return this.cache.get(sessionId);
  }

  public updateUserWithVariables(user: User, userVariable: UserVariable): User {
    return {
      userId: user.userId,
      username: user.username,
      ...userVariable,
    };
  }

  public async getSimpleUser(userId: string): Promise<SimpleUser> {
    this.checkAndInvalidateOldCache();
    if (this.simpleUserCache.has(userId)) {
      return this.simpleUserCache.get(userId)!;
    }
    const simpleUser = await axios.get<SimpleUser>(this.authApi + '/api/user?userId=' + userId).then((res) => res.data);

    this.simpleUserCache.set(userId, simpleUser);

    return simpleUser;
  }

  private checkAndInvalidateOldCache(): void {
    if (isAfter(new Date(), addHours(this.cacheTime, 1))) {
      this.cache.clear();
      this.simpleUserCache.clear();
      this.cacheTime = new Date();
    }
  }
}
