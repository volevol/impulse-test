import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../../modules/auth/auth.service';
import { Request } from 'express';
import config from 'config/config';
import { REFRESH_TOKEN_HEADER_NAME } from '../../../utils/constants/common';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.get(REFRESH_TOKEN_HEADER_NAME),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: jwt.JwtPayload): Promise<User> {
    const refreshToken = req.get(REFRESH_TOKEN_HEADER_NAME);

    return this.authService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.id,
    );
  }
}
