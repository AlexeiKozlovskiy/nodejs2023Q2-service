import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { DBService } from '../db/db';
import { v4 as uuid4 } from 'uuid';
import { Artist } from '../types/types';

@Injectable()
export class ArtistService {
  constructor(private DB: DBService) {}

  async getArtists(): Promise<Artist[]> {
    return await this.DB.getArtistsDB();
  }

  async getArtist(id: string): Promise<Artist> {
    return await this.DB.getArtistDB(id);
  }

  async createArtist({ name, grammy }: CreateArtistDto): Promise<Artist> {
    const id = uuid4();
    const createArtist = {
      id,
      name,
      grammy,
    };
    await this.DB.createArtistDB(createArtist);
    return createArtist;
  }

  async updateArtist(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<Artist> {
    const updatedArtist = {
      id,
      name,
      grammy,
    };
    await this.DB.updateArtistDB(id, updatedArtist);
    return updatedArtist;
  }

  async deleteArtist(id: string) {
    await this.DB.deleteArtistDB(id);
  }
}
