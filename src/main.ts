import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(config.port) || 3000;
  await app.listen(port);
  console.log(`The app is running on port ${port}`);
}
bootstrap();
