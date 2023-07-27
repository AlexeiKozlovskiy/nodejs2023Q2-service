import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db';
import { FavoritesRepsonse } from '../types/types';

@Injectable()
export class FavouritesService {
  constructor(private DB: DBService) {}

  async getFavorites(): Promise<FavoritesRepsonse> {
    const { artists, albums, tracks } = await this.DB.getFavoritesDB();
    return {
      artists: await Promise.all(artists.map((id) => this.DB.getArtistDB(id))),
      albums: await Promise.all(albums.map((id) => this.DB.getAlbumDB(id))),
      tracks: await Promise.all(tracks.map((id) => this.DB.getTrackDB(id))),
    };
  }

  async getFavTracks(): Promise<string[]> {
    return await this.DB.getFavTracksDB();
  }

  async getFavAlbums(): Promise<string[]> {
    return await this.DB.getFavAlbumsDB();
  }

  async getFavArtists(): Promise<string[]> {
    return await this.DB.getFavArtistsDB();
  }

  async addTrackFav(id: string) {
    await this.DB.addTrackFavDB(id);
  }

  async removeTrackFav(id: string) {
    await this.DB.removeTrackFavDB(id);
  }

  async addArtistFav(id: string) {
    await this.DB.addArtistFavDB(id);
  }

  async removeArtistFav(id: string) {
    await this.DB.removeArtistFavDB(id);
  }

  async addAlbumFav(id: string) {
    await this.DB.addAlbumFavDB(id);
  }

  async removeAlbumFavDB(id: string) {
    await this.DB.removeAlbumFavDB(id);
  }
}
