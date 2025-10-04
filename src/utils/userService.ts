import { User, UserVariable } from '@/models/user';
import { addHours, isAfter } from 'date-fns';

export class UserService {
  private cacheTime: Date = new Date();

  private readonly cache = new Map<string, User>();

  public addUserToCache(sessionId: string, user: User): void {
    this.checkAndInvalidateOldCache();
    this.cache.set(sessionId, user);
  }

  public getUserFromCache(sessionId: string): User | undefined {
    this.checkAndInvalidateOldCache();
    return this.cache.get(sessionId);
  }

  public updateUserWithVariables(user: User, userVariable: UserVariable): User {
    this.checkAndInvalidateOldCache();
    const updatedUser = {
      userId: user.userId,
      username: user.username,
      ...userVariable,
    };

    this.cache.set(user.userId, updatedUser);
    return updatedUser;
  }

  private checkAndInvalidateOldCache(): void {
    if (isAfter(new Date(), addHours(this.cacheTime, 1))) {
      this.cache.clear();
      this.cacheTime = new Date();
    }
  }
}
