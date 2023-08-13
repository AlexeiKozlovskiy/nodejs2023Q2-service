import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.modul';
import { ArtistModule } from './artist/artist.modul';
import { AlbumModule } from './album/album.modul';
import { TrackModule } from './track/track.modul';
import { FavouritesModule } from './favourites/favourites.modul';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavouritesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
