import { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;
  name: string;
  email: string;
  token: string;
  refreshToken: string;

  // exclude this from server response
  password: string;
}
