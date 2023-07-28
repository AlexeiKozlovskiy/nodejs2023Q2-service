import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'node:path';
import { cwd } from 'process';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const file = await readFile(path.join(cwd(), 'doc', 'api.yaml'), 'utf8');
  SwaggerModule.setup('doc', app, parse(file));

  dotenv.config();
  const PORT = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(PORT);
}
bootstrap();
