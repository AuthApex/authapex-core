import { RoleModel } from '@/models/roles';

export interface User {
  userId: string;
  username: string;
  email: string;
  roles: RoleModel[];
  displayName: string;
  profileImageId?: string;
  profileImageUrl?: string;
}

export interface UserRequest {
  session: string;
  app: string;
}

export interface GetUserResponse {
  expiresAt: string;
  user: User;
}
