import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * The bootstrap() function is the entry point to the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
