import { RoleModel } from '@/models/roles';

export interface User {
  // Core fields
  userId: string;
  username: string;

  // Variable fields
  email: string;
  roles: RoleModel[];
  displayName: string;
  profileImageId?: string | null;
  profileImageUrl?: string | null;
}
