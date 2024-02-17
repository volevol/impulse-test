import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Prisma, User } from '@prisma/client';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp({
    email,
    password,
    name,
  }: SignUpRequestDto): Promise<SignUpResponseDto> {
    const lowerCaseEmail = email.toLowerCase();
    const encryptedPassword = password; // add this logic later

    let createdUser: User;

    try {
      createdUser = await this.userService.create({
        email: lowerCaseEmail,
        password: encryptedPassword,
        name,
      });
      console.log('createdUser', createdUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new user cannot be created with this email',
          );
        } else {
          throw error;
        }
      }
    }

    return { id: createdUser.id };
  }

  async signIn({
    email,
    password,
  }: SignInRequestDto): Promise<SignInResponseDto> {
    const lowerCaseEmail = email.toLowerCase();

    const userFromDb = await this.userService.findOne({
      email: lowerCaseEmail,
    });

    // mock logic {
    const isPasswordVerified = userFromDb.password === password;

    if (!isPasswordVerified) {
      throw new BadRequestException('Wrong credentials!');
    }
    // } mock logic

    return {
      id: userFromDb.id,
    };
  }
}
