import { Album, Artist, Track } from '@prisma/client';

export enum MessageStatus {
  USER_NOT_FOUND = 'User not found',
  ARTIST_NOT_FOUND = 'Artist not found',
  ALBUM_NOT_FOUND = 'Album not found',
  TRACK_NOT_FOUND = 'Track not found',
  USER_PASSWORD_IS_INVALID = 'User password is invalid',
}

export interface FavoritesResp {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface UserResp {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
