export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export type UserResp = Omit<User, 'password'>;

export enum MessageStatus {
  USER_NOT_FOUND = 'User not found',
  ARTIST_NOT_FOUND = 'Artist not found',
  ALBUM_NOT_FOUND = 'Album not found',
  USER_PASSWORD_IS_INVALID = 'User password is invalid',
}
