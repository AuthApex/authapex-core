import { User } from '@/models/user';
import { addHours, isAfter } from 'date-fns';
import axios from 'axios';

export class UserService {
  private cacheTime: Date = new Date();

  private readonly SESSION_CACHE = new Map<string, string>();
  private readonly USER_CACHE = new Map<string, User>();

  constructor(
    private readonly authApi: string,
    private readonly app: string,
    private readonly apiKey?: string
  ) {}

  public addUserToCache(sessionId: string, user: User): void {
    this.checkAndInvalidateOldCache();
    this.SESSION_CACHE.set(sessionId, user.userId);
    this.USER_CACHE.set(user.userId, user);
  }

  public getUserFromCacheBySessionId(sessionId: string): User | undefined {
    this.checkAndInvalidateOldCache();
    const userId = this.SESSION_CACHE.get(sessionId);
    return userId ? this.USER_CACHE.get(userId) : undefined;
  }

  public getUserFromCacheByUserId(userId: string): User | undefined {
    this.checkAndInvalidateOldCache();
    return this.USER_CACHE.get(userId);
  }

  public clearCache(): void {
    this.SESSION_CACHE.clear();
    this.USER_CACHE.clear();
    this.cacheTime = new Date();
  }

  private checkAndInvalidateOldCache(): void {
    if (isAfter(new Date(), addHours(this.cacheTime, 1))) {
      this.clearCache();
    }
  }

  public async getUpdatedUser(userId: string): Promise<User> {
    const user = await axios
      .get<User>(this.authApi + '/api/user', {
        params: {
          userId: userId,
          app: this.app,
          apiKey: this.apiKey,
        },
      })
      .then((res) => res.data);
    this.USER_CACHE.set(userId, user);
    return user;
  }
}
