import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from './auth.dto';
import { routes } from '../../utils/constants/common';

@Controller(routes.auth.root)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(routes.auth.signUp)
  async signUp(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(dto);
  }

  @Post(routes.auth.signIn)
  async signIn(@Body() dto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(dto);
  }
}
