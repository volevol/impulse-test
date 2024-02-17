import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateUserDto, FindOneUserDto, UpdateOneUserDto } from './user.dto';

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
    try {
      const user: User = await this.prisma.user.findUniqueOrThrow({
        where: { ...(dto as Prisma.UserWhereUniqueInput) },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('No user with such id or email');
        } else {
          throw error;
        }
      }
    }
  }

  async findOneByToken({ token }: any): Promise<User> {
    try {
      const user: User = await this.prisma.user.findFirstOrThrow({
        where: { token },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UnauthorizedException('Token expired');
        } else {
          throw error;
        }
      }
    }
  }

  async updateOne(id: number, data: UpdateOneUserDto): Promise<User> {
    await this.findOne({ id });

    return this.prisma.user.update({ where: { id }, data });
  }
}
