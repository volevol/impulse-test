import { SignUpRequestDto } from '../auth/auth.dto';

export class CreateUserDto extends SignUpRequestDto {}

export class FindOneUserDto {
  id?: number;
  email?: string;
}

export class UpdateOneUserDto {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
}
