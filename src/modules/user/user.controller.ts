import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMany(): Promise<UserEntity[]> {
    const usersFromDb = await this.userService.findMany();

    return usersFromDb.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    const userFromDb = await this.userService.findOne(+id);

    return new UserEntity(userFromDb);
  }
}
