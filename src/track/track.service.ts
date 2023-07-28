import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track, FavItem } from '../types';
import { DBService } from '../db';

@Injectable()
export class TrackService {
  constructor(private DB: DBService) {}

  async getTracks(): Promise<Track[]> {
    return await this.DB.getTracksDB();
  }

  async getTrack(id: string): Promise<Track> {
    return await this.DB.getTrackDB(id);
  }

  async createTrack({
    name,
    albumId,
    artistId,
    duration,
  }: CreateTrackDto): Promise<Track> {
    const id = uuid4();
    const createTrack = {
      id,
      name,
      albumId,
      artistId,
      duration,
    };
    await this.DB.createTrackDB(createTrack);
    return createTrack;
  }

  async updateTrack(
    id: string,
    { name, albumId, artistId, duration }: UpdateTrackDto,
  ): Promise<Track> {
    const updatedTrack = {
      id,
      name,
      albumId,
      artistId,
      duration,
    };
    await this.DB.updateTrackDB(id, updatedTrack);
    return updatedTrack;
  }

  async deleteTrack(id: string) {
    await this.DB.deleteTrackDB(id);

    const track = await this.DB.getFavTracksDB();
    track.includes(id) ? await this.DB.removeFavItemDB(id, FavItem.TRACK) : null;
  }
}
