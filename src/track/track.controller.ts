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
import { Track, MessageStatus } from '../types/types';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAllTracks(): Promise<Track[]> {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  async getTrackById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Track> {
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        MessageStatus.TRACK_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  @Post()
  async createTrack(@Body(ValidationPipe) dto: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(dto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        MessageStatus.TRACK_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.trackService.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        MessageStatus.TRACK_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.trackService.deleteTrack(id);
    return;
  }
}
