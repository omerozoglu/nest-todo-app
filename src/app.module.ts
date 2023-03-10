import {
  Module,
  CacheModule,
  CacheStore,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { redisStore } from 'cache-manager-redis-store';
import { RequestMethod } from '@nestjs/common/enums';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { BlogModule } from './modules/blog/blog.module';
import { LanguageModule } from './modules/language/language.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UuidInterceptor } from './common/uuid/uuid.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore as undefined as CacheStore,
      url: process.env.REDIS_URL,
    }),
    TodoModule,
    UserModule,
    AuthModule,
    BlogModule,
    LanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.ALL },
        { path: '/auth/register', method: RequestMethod.ALL }
      )
      .forRoutes('*');
  }
}
