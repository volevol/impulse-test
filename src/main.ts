import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = Number(config.port) || 3000;
  await app.listen(port);
  console.log(`The app is running on port ${port}`);
}
bootstrap();
