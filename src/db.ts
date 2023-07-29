import { Injectable } from '@nestjs/common';
import { User, Artist, Album, Track, Favorites, FavItem } from './types';
import { Module, Global } from '@nestjs/common';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  // DRY helper methods
  private updateItemDB<T extends { id: string }>(collection: T[], id: string, updatedItem: T) {
    const updateIndex = collection.findIndex((el) => el.id === id);
    collection[updateIndex] = updatedItem;
  }

  private deleteItemDB<T extends { id: string }>(collection: T[], id: string) {
    const deleteIndex = collection.findIndex((el) => el.id === id);
    collection.splice(deleteIndex, 1);
  }

  // Users
  async getUsersDB(): Promise<User[]> {
    return this.users;
  }

  async getUserDB(id: string): Promise<User> {
    return this.users.find((el) => el.id === id);
  }

  async createUserDB(user: User) {
    this.users.push(user);
  }

  async updateUserPasswordDB(id: string, updatedUser: User) {
    this.updateItemDB(this.users, id, updatedUser);
  }

  async deleteUserDB(id: string) {
    this.deleteItemDB(this.users, id);
  }

  // Artists
  async getArtistsDB(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistDB(id: string): Promise<Artist> {
    return this.artists.find((el) => el.id === id);
  }

  async createArtistDB(artist: Artist) {
    this.artists.push(artist);
  }

  async updateArtistDB(id: string, updatedArtist: Artist) {
    this.updateItemDB(this.artists, id, updatedArtist);
  }

  async deleteArtistDB(id: string) {
    this.deleteItemDB(this.artists, id);
  }

  // Albums
  async getAlbumsDB(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumDB(id: string): Promise<Album> {
    return this.albums.find((el) => el.id === id);
  }

  async createAlbumDB(createAlbum: Album) {
    this.albums.push(createAlbum);
  }

  async updateAlbumDB(id: string, updatedAlbum: Album) {
    this.updateItemDB(this.albums, id, updatedAlbum);
  }

  async deleteAlbumDB(id: string) {
    this.deleteItemDB(this.albums, id);
  }

  // Tracks
  async getTracksDB(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackDB(id: string): Promise<Track> {
    const track = this.tracks.find((el) => el.id === id);
    return track;
  }

  async createTrackDB(createTrack: Track) {
    this.tracks.push(createTrack);
  }

  async updateTrackDB(id: string, updatedTrack: Track) {
    this.updateItemDB(this.tracks, id, updatedTrack);
  }

  async deleteTrackDB(id: string) {
    this.deleteItemDB(this.tracks, id);
  }

  // Favorites
  async getFavoritesDB(): Promise<Favorites> {
    return this.favorites;
  }

  async getFavTracksDB(): Promise<string[]> {
    return this.favorites.tracks;
  }

  async getFavAlbumsDB(): Promise<string[]> {
    return this.favorites.albums;
  }

  async getFavArtistsDB(): Promise<string[]> {
    return this.favorites.artists;
  }

  // DRY helper Favorites
  async addFavItemDB(id: string, type: FavItem) {
    this.favorites[type].push(id);
  }

  async removeFavItemDB(id: string, type: FavItem) {
    const deleteIndex = this.favorites[type].findIndex((el) => el === id);
    this.favorites[type].splice(deleteIndex, 1);
  }
}

@Global()
@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
