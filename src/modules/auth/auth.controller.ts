import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RefreshTokensResponseDto,
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from './auth.dto';
import { routes } from '../../utils/constants/common';
import { User, UserRequestObject } from 'src/utils/decorators/user.decorator';
import { JwtAuthGuard } from 'src/utils/services/jwt/jwt-auth.guard';

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

  @Post(routes.auth.signOut)
  async signOut(@User() user: UserRequestObject): Promise<void> {
    return this.authService.signOut(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(routes.auth.refresh)
  async refreshTokens(
    @User() user: UserRequestObject,
  ): Promise<RefreshTokensResponseDto> {
    return this.authService.refreshTokens(user);
  }
}
