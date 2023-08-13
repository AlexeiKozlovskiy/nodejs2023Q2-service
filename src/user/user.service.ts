import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'prisma/prisma-client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        login,
        password,
        version: 1,
      },
    });
  }

  async updateUserPassword(
    id: string,
    { newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: ++user.version,
      },
    });
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}
