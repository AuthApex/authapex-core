export type PermRoles = 'user' | 'vip' | 'moderator' | 'admin' | 'owner';

export interface RoleModel {
  application: string;
  role: PermRoles;
}
