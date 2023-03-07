import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception/all-exception.filter';

/**
 * The bootstrap() function is the entry point to the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
