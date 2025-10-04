import { RoleModel } from '@/models/roles';

export interface UserCore {
  userId: string;
  username: string;
}

export interface UserVariable {
  email: string;
  roles: RoleModel[];
  displayName: string;
  profileImageId?: string | null;
  profileImageUrl?: string | null;
}

export interface User extends UserCore, UserVariable {}
