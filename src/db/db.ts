import { Injectable } from '@nestjs/common';
import { User } from '../types/types';
import { Module, Global } from '@nestjs/common';

@Injectable()
export class DBService {
  private readonly users: User[] = [];

  async getUsersDB(): Promise<User[]> {
    return this.users;
  }

  async getUserDB(id: string): Promise<User> {
    return this.users.find(({ id }) => id);
  }

  async createUserDB(user: User) {
    this.users.push(user);
  }

  async updateUserPasswordDB(id: string, updatedUser: User) {
    const updateIndex = this.users.findIndex(({ id }) => id);
    this.users[updateIndex] = updatedUser;
  }

  async deleteUserDB(id: string) {
    const deleteIndex = this.users.findIndex(({ id }) => id);
    this.users.splice(deleteIndex, 1);
  }
}

@Global()
@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
