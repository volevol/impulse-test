import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { TokenMiddleware } from './utils/services/jwt/token.middleware';
import { publicRoutes } from './utils/constants/common';

@Module({
  imports: [SharedModule, AuthModule, UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TokenMiddleware)
      .exclude(...publicRoutes)
      .forRoutes('*');
  }
}
