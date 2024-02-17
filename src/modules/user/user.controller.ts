import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { routes } from '../../utils/constants/common';

@Controller(routes.user.root)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(routes.user.findMany)
  async findMany(): Promise<UserEntity[]> {
    const usersFromDb = await this.userService.findMany();

    return usersFromDb.map((user) => new UserEntity(user));
  }

  @Get(routes.user.findOneById)
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<UserEntity> {
    const userFromDb = await this.userService.findOne({ id });

    return new UserEntity(userFromDb);
  }
}
