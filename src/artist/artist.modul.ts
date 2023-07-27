import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.servise';
import { AlbumModule } from '../album/album.modul';
import { FavouritesModule } from '../favourites/favourites.modul';
import { TrackModule } from '../track/track.modul';

@Module({
  imports: [AlbumModule, TrackModule, FavouritesModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
