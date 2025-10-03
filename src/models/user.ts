import { RoleModel } from '@/models/roles';

export interface UserCore {
  userId: string;
  username: string;
}

interface SimpleUserPart {
  displayName: string;
  profileImageId?: string | null;
  profileImageUrl?: string | null;
}

export interface UserVariable extends SimpleUserPart {
  email: string;
  roles: RoleModel[];
}

export interface SimpleUser extends UserCore, SimpleUserPart {}

export interface User extends UserCore, UserVariable {}
