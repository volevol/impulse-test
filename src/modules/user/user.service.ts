import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateUserDto, FindOneUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(dto: FindOneUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { ...(dto as Prisma.UserWhereUniqueInput) },
    });

    if (!user) {
      throw new NotFoundException('No user with such id or email');
    }

    return user;
  }
}
