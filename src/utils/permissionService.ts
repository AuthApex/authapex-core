import { PermRoles } from '@/models/roles';
import { User } from '@/models/user';

export class PermissionService {
  constructor(private readonly app: string) {}

  public getPermission(user: User): PermRoles {
    const application = user.roles.find((role) => role.application === this.app);
    if (!application) {
      return 'user';
    }
    return application.role;
  }
}
