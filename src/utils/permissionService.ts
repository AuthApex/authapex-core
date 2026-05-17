import { PERM_ROLES, PermRoles } from '@/models/roles';
import { User } from '@/models/user';

export interface PermissionServiceOptions {
  app: string;
}

export class PermissionService {
  constructor(private readonly options: PermissionServiceOptions) {}

  public getPermission(user: User): PermRoles {
    const application = user.roles.find((role) => role.application === this.options.app);
    if (!application) {
      return 'user';
    }
    return application.role;
  }

  public hasPermission(user: User, permission: PermRoles): boolean {
    const usersPermission = this.getPermission(user);
    return PERM_ROLES[usersPermission] >= PERM_ROLES[permission];
  }
}
