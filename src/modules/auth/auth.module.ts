import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthTokenService } from './auth-token.service';
import { JwtStrategy } from '../../utils/services/jwt/jwt.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthTokenService, JwtStrategy, AuthService],
  exports: [AuthTokenService],
})
export class AuthModule {}
