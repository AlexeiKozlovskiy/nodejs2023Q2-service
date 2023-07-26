import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.modul';
import { DBModule } from './db/db';

@Module({
  imports: [UserModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
