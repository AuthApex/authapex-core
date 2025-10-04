import { User } from '@/models/user';
import { addHours, isAfter } from 'date-fns';
import axios from 'axios';

export class UserService {
  private cacheTime: Date = new Date();

  private readonly cache = new Map<string, User>();

  constructor(
    private readonly authApi: string,
    private readonly app: string,
    private readonly apiKey: string
  ) {}

  public addUserToCache(sessionId: string, user: User): void {
    this.checkAndInvalidateOldCache();
    this.cache.set(sessionId, user);
  }

  public getUserFromCache(sessionId: string): User | undefined {
    this.checkAndInvalidateOldCache();
    return this.cache.get(sessionId);
  }

  public clearCache(): void {
    this.cache.clear();
    this.cacheTime = new Date();
  }

  private checkAndInvalidateOldCache(): void {
    if (isAfter(new Date(), addHours(this.cacheTime, 1))) {
      this.clearCache();
    }
  }

  public async getUpdatedUser(userId: string): Promise<User> {
    return axios
      .get<User>(this.authApi + '/api/user', {
        params: {
          userId: userId,
          app: this.app,
          apiKey: this.apiKey,
        },
      })
      .then((res) => res.data);
  }
}
