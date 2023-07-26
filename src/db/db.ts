import { Injectable } from '@nestjs/common';
import { User, Artist, Album, Track } from '../types/types';
import { Module, Global } from '@nestjs/common';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];

  async getUsersDB(): Promise<User[]> {
    return this.users;
  }

  async getUserDB(id: string): Promise<User> {
    return this.users.find(({ id }) => id);
  }

  async createUserDB(user: User) {
    this.users.push(user);
  }

  async updateUserPasswordDB(id: string, updatedUser: User) {
    const updateIndex = this.users.findIndex(({ id }) => id);
    this.users[updateIndex] = updatedUser;
  }

  async deleteUserDB(id: string) {
    const deleteIndex = this.users.findIndex(({ id }) => id);
    this.users.splice(deleteIndex, 1);
  }

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
    const updateIndex = this.artists.findIndex((el) => el.id === id);
    this.artists[updateIndex] = updatedArtist;
  }

  async deleteArtistDB(id: string) {
    const deleteIndex = this.artists.findIndex((el) => el.id === id);
    this.artists.splice(deleteIndex, 1);
  }

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
    const updateIndex = this.albums.findIndex((el) => el.id === id);
    this.albums[updateIndex] = updatedAlbum;
  }

  async deleteAlbumDB(id: string) {
    const deleteIndex = this.albums.findIndex((el) => el.id === id);
    this.albums.splice(deleteIndex, 1);
  }

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
    const updateIndex = this.tracks.findIndex((el) => el.id === id);
    this.tracks[updateIndex] = updatedTrack;
  }

  async deleteTrackDB(id: string) {
    const deleteIndex = this.tracks.findIndex((el) => el.id === id);
    this.tracks.splice(deleteIndex, 1);
  }
}

@Global()
@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
