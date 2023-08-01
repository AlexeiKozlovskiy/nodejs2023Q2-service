import {
  Controller,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { MessageStatus } from '../types';
import { Album } from '@prisma/client';
import { AlbumService } from './album.service';
import { ArtistService } from '../artist/artist.servise';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(MessageStatus.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Post()
  async createAlbum(@Body(ValidationPipe) dto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(dto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateAlbumDto,
  ): Promise<Album> {
    const { artistId } = dto;
    if (artistId) {
      const artist = await this.artistService.getArtist(artistId);
      if (!artist) {
        throw new HttpException(
          MessageStatus.ARTIST_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(MessageStatus.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(MessageStatus.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.albumService.deleteAlbum(id);
  }
}
