import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from 'prisma/prisma-client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async getArtist(id: string): Promise<Artist> {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  async createArtist({ name, grammy }: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: {
        name,
        grammy,
      },
    });
  }

  async updateArtist(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<Artist> {
    const updatedUser = await this.prisma.artist.update({
      where: { id },
      data: {
        name,
        grammy,
      },
    });
    return updatedUser;
  }

  async deleteArtist(ID: string) {
    const albums = await this.prisma.album.findMany();
    for (const album of albums) {
      const { id, name, year, artistId } = album;
      if (artistId === ID) {
        await this.prisma.album.update({
          where: { id },
          data: {
            id,
            name,
            year,
            artistId: null,
          },
        });
      }
    }

    const tracks = await this.prisma.track.findMany();
    for (const track of tracks) {
      const { id, name, artistId, albumId, duration } = track;
      if (artistId === ID) {
        await this.prisma.track.update({
          where: { id },
          data: {
            id,
            name,
            artistId: null,
            albumId,
            duration,
          },
        });
      }
    }

    const artist = await this.prisma.favouriteArtist.findMany();
    const favArtist = artist.find(({ artistId }) => artistId === ID);

    if (favArtist) {
      await this.prisma.favouriteArtist.delete({ where: { artistId: ID } });
    }
    await this.prisma.artist.delete({ where: { id: ID } });
  }
}
