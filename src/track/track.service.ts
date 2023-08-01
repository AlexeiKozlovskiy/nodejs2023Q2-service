import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async getTrack(id: string): Promise<Track> {
    return await this.prisma.track.findUnique({ where: { id } });
  }

  async createTrack({
    name,
    albumId,
    artistId,
    duration,
  }: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({
      data: {
        name,
        artistId,
        albumId,
        duration,
      },
    });
  }

  async updateTrack(
    id: string,
    { name, albumId, artistId, duration }: UpdateTrackDto,
  ): Promise<Track> {
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: {
        id,
        name,
        albumId,
        artistId,
        duration,
      },
    });
    return updatedTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.favouriteTrack.findMany();
    const favTrack = track.find(({ trackId }) => trackId === id);
    
    if (favTrack) {
      await this.prisma.favouriteTrack.delete({ where: { trackId: id } });
    }
    await this.prisma.track.delete({ where: { id } });
  }
}
