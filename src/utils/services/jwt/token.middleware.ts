import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokenService } from '../../../modules/auth/auth-token.service';
import { UserService } from '../../../modules/user/user.service';
import { NextFunction, Request, Response } from 'express';
import config from 'config/config';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerToken = req.get('authorization');
      const token = bearerToken?.replace('Bearer', '').trim();
      const decoded = this.authTokenService.verifyToken(
        token,
        config.jwtSecret,
      );
      const user = await this.userService.findOneByToken({ token });

      if (user.id !== decoded['id']) {
        throw new UnauthorizedException();
      }

      req['user'] = user;

      next();
    } catch (error) {
      switch (error.name) {
        case 'TokenExpiredError':
        case 'JsonWebTokenError':
          throw new UnauthorizedException(error);
        default:
          throw error;
      }
    }
  }
}
