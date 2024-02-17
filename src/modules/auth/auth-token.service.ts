import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthTokenService {
  generateToken(data: any, expiresInHours: number, secret: string): string {
    return jwt.sign(data, secret, {
      expiresIn: `${expiresInHours}h`,
    });
  }

  verifyToken(token: string, secret: string): string | jwt.JwtPayload {
    return jwt.verify(token, secret);
  }
}
