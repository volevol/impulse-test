import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthTokenService } from './auth-token.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthTokenService, AuthService],
  exports: [AuthTokenService],
})
export class AuthModule {}
