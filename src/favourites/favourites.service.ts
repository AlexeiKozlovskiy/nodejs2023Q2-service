import { Injectable } from '@nestjs/common';
import { FavoritesResp } from '../types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(): Promise<FavoritesResp> {
    const artists = await this.prisma.artist.findMany();
    const favArtist = await this.prisma.favouriteArtist.findMany();

    const albums = await this.prisma.album.findMany();
    const favAlbum = await this.prisma.favouriteAlbum.findMany();

    const tracks = await this.prisma.track.findMany();
    const favTrack = await this.prisma.favouriteTrack.findMany();

    return {
      artists: favArtist.map((el) => artists.find(({ id }) => id === el.artistId)),
      albums: favAlbum.map((el) => albums.find(({ id }) => id === el.albumId)),
      tracks: favTrack.map((el) => tracks.find(({ id }) => id === el.trackId)),
    };
  }

  async getFavTracks(): Promise<string[]> {
    const result = await this.prisma.favouriteTrack.findMany();
    return result.map(({ trackId }) => trackId);
  }

  async getFavAlbums(): Promise<string[]> {
    const result = await this.prisma.favouriteAlbum.findMany();
    return result.map(({ albumId }) => albumId);
  }

  async getFavArtists(): Promise<string[]> {
    const result = await this.prisma.favouriteArtist.findMany();
    return result.map(({ artistId }) => artistId);
  }

  async addTrackFav(id: string) {
    await this.prisma.favouriteTrack.create({ data: { trackId: id } });
  }

  async removeTrackFav(id: string) {
    await this.prisma.favouriteTrack.delete({ where: { trackId: id } });
  }

  async addArtistFav(id: string) {
    await this.prisma.favouriteArtist.create({ data: { artistId: id } });
  }

  async removeArtistFav(id: string) {
    await this.prisma.favouriteArtist.delete({ where: { artistId: id } });
  }

  async addAlbumFav(id: string) {
    await this.prisma.favouriteAlbum.create({ data: { albumId: id } });
  }

  async removeAlbumFavDB(id: string) {
    await this.prisma.favouriteAlbum.delete({ where: { albumId: id } });
  }
}
