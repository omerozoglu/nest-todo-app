import { Blog } from './entities/blog.entity';
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTranslation } from './entities/blog-translation';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogTranslation])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
