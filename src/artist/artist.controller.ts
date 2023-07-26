import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { ArtistService } from './artist.servise';
import { Artist, MessageStatus } from '../types/types';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  async getArtistById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        MessageStatus.ARTIST_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  @Post()
  async createArtist(
    @Body(ValidationPipe) dto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.createArtist(dto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        MessageStatus.ARTIST_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.artistService.updateArtist(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        MessageStatus.ARTIST_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.artistService.deleteArtist(id);
    return;
  }
}
