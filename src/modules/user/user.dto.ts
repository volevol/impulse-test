import { SignUpRequestDto } from '../auth/auth.dto';

export class CreateUserDto extends SignUpRequestDto {}

export class FindOneUserDto {
  id?: number;
  email?: string;
}
