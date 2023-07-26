import { Injectable } from '@nestjs/common';
import { User, Artist } from '../types/types';
import { Module, Global } from '@nestjs/common';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];

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

  async getArtistsDB(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistDB(id: string): Promise<Artist> {
    return this.artists.find((el) => el.id === id);
  }

  async createArtistDB(artist: Artist) {
    this.artists.push(artist);
  }

  async updateArtistDB(id: string, updatedArtist: Artist) {
    const updateIndex = this.artists.findIndex((el) => el.id === id);
    this.artists[updateIndex] = updatedArtist;
  }

  async deleteArtistDB(id: string) {
    const deleteIndexArtist = this.artists.findIndex((el) => el.id === id);
    this.artists.splice(deleteIndexArtist, 1);
  }
}

@Global()
@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
