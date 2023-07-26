import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { User } from '../types/types';
import { DBService } from '../db/db';

@Injectable()
export class UserService {
  constructor(private DB: DBService) {}

  async getUsers(): Promise<User[]> {
    return await this.DB.getUsersDB();
  }

  async getUser(id: string): Promise<User> {
    return await this.DB.getUserDB(id);
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const id = uuid();
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const createUser = {
      id,
      login,
      password,
      version,
      createdAt,
      updatedAt,
    };
    await this.DB.createUserDB(createUser);
    return createUser;
  }

  async updateUserPassword(
    id: string,
    { newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.DB.getUserDB(id);
    const { login, createdAt } = user;
    const updatedUser: User = {
      id,
      login,
      password: newPassword,
      version: ++user.version,
      updatedAt: Date.now(),
      createdAt,
    };
    await this.DB.updateUserPasswordDB(id, updatedUser);
    return updatedUser;
  }
  async deleteUser(id: string) {
    await this.DB.deleteUserDB(id);
  }
}
