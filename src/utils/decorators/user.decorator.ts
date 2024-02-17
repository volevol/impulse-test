import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../../modules/user/entities/user.entity';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['user'];
  },
);

export class UserRequestObject extends UserEntity {}
