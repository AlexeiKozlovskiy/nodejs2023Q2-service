import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { DBService } from '../db';
import { v4 as uuid4 } from 'uuid';
import { Artist, FavItem } from '../types';

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

  async deleteArtist(ID: string) {
    await this.DB.deleteArtistDB(ID);

    const albums = await this.DB.getAlbumsDB();
    for (const album of albums) {
      const { id, name, year, artistId } = album;
      if (artistId === ID) {
        await this.DB.updateAlbumDB(id, {
          id,
          name,
          year,
          artistId: null,
        });
      }
    }

    const tracks = await this.DB.getTracksDB();
    for (const track of tracks) {
      const { id, name, artistId, albumId, duration } = track;
      if (artistId === ID) {
        await this.DB.updateTrackDB(id, {
          id,
          name,
          artistId: null,
          albumId,
          duration,
        });
      }
    }

    const artist = await this.DB.getFavArtistsDB();
    artist.includes(ID) ? await this.DB.removeFavItemDB(ID, FavItem.ARTIST) : null;
  }
}
