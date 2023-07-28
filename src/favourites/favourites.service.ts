import { Injectable } from '@nestjs/common';
import { DBService } from '../db';
import { FavoritesResp, FavItem } from '../types';

@Injectable()
export class FavouritesService {
  constructor(private DB: DBService) {}

  async getFavorites(): Promise<FavoritesResp> {
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
    await this.DB.addFavItemDB(id, FavItem.TRACK);
  }

  async removeTrackFav(id: string) {
    await this.DB.removeFavItemDB(id, FavItem.TRACK);
  }

  async addArtistFav(id: string) {
    await this.DB.addFavItemDB(id, FavItem.ARTIST);
  }

  async removeArtistFav(id: string) {
    await this.DB.removeFavItemDB(id, FavItem.ARTIST);
  }

  async addAlbumFav(id: string) {
    await this.DB.addFavItemDB(id, FavItem.ALBUM);
  }

  async removeAlbumFavDB(id: string) {
    await this.DB.removeFavItemDB(id, FavItem.ALBUM);
  }
}
