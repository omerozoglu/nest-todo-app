import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception/all-exception.filter';

/**
 * The bootstrap() function is the entry point to the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter()); // This is the global filter for all routes
  app.useGlobalPipes(new ValidationPipe()); // This is the global pipe for all routes
  await app.listen(3000);
}

bootstrap();
