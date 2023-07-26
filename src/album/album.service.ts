import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { Album } from '../types/types';
import { DBService } from '../db/db';

@Injectable()
export class AlbumService {
  constructor(private DB: DBService) {}

  async getAlbums(): Promise<Album[]> {
    return await this.DB.getAlbumsDB();
  }

  async getAlbum(id: string): Promise<Album> {
    return await this.DB.getAlbumDB(id);
  }

  async createAlbum({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    const id = uuid4();
    const createAlbum = {
      id,
      name,
      year,
      artistId,
    };
    await this.DB.createAlbumDB(createAlbum);
    return createAlbum;
  }

  async updateAlbum(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<Album> {
    const updatedUser = {
      id,
      name,
      year,
      artistId,
    };
    await this.DB.updateAlbumDB(id, updatedUser);
    return updatedUser;
  }

  async deleteAlbum(id: string) {
    await this.DB.deleteUserDB(id);
  }
}
