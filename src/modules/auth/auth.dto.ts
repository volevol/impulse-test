import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpRequestDto extends SignInRequestDto {
  @IsOptional()
  @IsString()
  name?: string;
}

export class SignUpResponseDto {
  id: number;
}

export class SignInResponseDto extends SignUpResponseDto {
  token: string;
  refreshToken: string;
}

export class RefreshTokensResponseDto extends SignInResponseDto {}
