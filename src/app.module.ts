import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db';
import { UserModule } from './user/user.modul';
import { ArtistModule } from './artist/artist.modul';
import { AlbumModule } from './album/album.modul';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
