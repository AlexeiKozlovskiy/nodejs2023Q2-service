import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const PORT = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(PORT);
}
bootstrap();
