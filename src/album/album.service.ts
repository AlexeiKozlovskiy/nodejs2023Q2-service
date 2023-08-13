import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { Album } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async getAlbum(id: string): Promise<Album> {
    return await this.prisma.album.findUnique({ where: { id } });
  }

  async createAlbum({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async updateAlbum(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<Album> {
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        name,
        year,
        artistId,
      },
    });
    return updatedAlbum;
  }

  async deleteAlbum(ID: string) {
    const tracks = await this.prisma.track.findMany();
    for (const track of tracks) {
      const { id, name, artistId, albumId, duration } = track;
      if (albumId === ID) {
        await this.prisma.track.update({
          where: { id },
          data: {
            id,
            name,
            artistId,
            albumId: null,
            duration,
          },
        });
      }
    }

    const album = await this.prisma.favouriteAlbum.findMany();
    const favAlbum = album.find(({ albumId }) => albumId === ID);

    if (favAlbum) {
      await this.prisma.favouriteAlbum.delete({ where: { albumId: ID } });
    }
    await this.prisma.album.delete({ where: { id: ID } });
  }
}
