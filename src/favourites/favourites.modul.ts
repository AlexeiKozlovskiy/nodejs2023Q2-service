import { Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';
import { ArtistModule } from '../artist/artist.modul';
import { AlbumModule } from '../album/album.modul';
import { TrackModule } from '../track/track.modul';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
