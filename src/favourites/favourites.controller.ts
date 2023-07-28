import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MessageStatus, FavoritesResp } from '../types';
import { FavouritesService } from './favourites.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.servise';
import { AlbumService } from '..//album/album.service';

@Controller('favs')
export class FavouritesController {
  constructor(
    private favouritesService: FavouritesService,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  @Get()
  async getAllFavorites(): Promise<FavoritesResp> {
    return await this.favouritesService.getFavorites();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        MessageStatus.TRACK_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favouritesService.addTrackFav(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const favTrack = (await this.favouritesService.getFavTracks()).includes(id);
    if (!favTrack) {
      throw new HttpException(MessageStatus.TRACK_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    await this.favouritesService.removeTrackFav(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(
        MessageStatus.ALBUM_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favouritesService.addAlbumFav(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const favAlbum = (await this.favouritesService.getFavAlbums()).includes(id);
    if (!favAlbum) {
      throw new HttpException(MessageStatus.ALBUM_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    await this.favouritesService.removeAlbumFavDB(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        MessageStatus.ARTIST_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favouritesService.addArtistFav(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const favArtist = (await this.favouritesService.getFavArtists()).includes(id);
    if (!favArtist) {
      throw new HttpException(
        MessageStatus.ARTIST_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.favouritesService.removeArtistFav(id);
  }
}
