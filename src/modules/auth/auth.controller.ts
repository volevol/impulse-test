import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(dto);
  }

  @Post('signIn')
  async signIn(@Body() dto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(dto);
  }
}
