import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * The bootstrap() function is the entry point to the application.
 * It is responsible for creating the Nest application instance,
 * and then calling the NestFactory.create() method to create a new Nest application instance.
 * The create() method accepts a single argument, which is the root module of the application.
 * The root module is the AppModule class, which is imported from the app.module.ts file.
 * The create() method returns a Promise that resolves to an INestApplication object.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
