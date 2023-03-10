import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { UuidInterceptor } from 'src/common/uuid/uuid.interceptor';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Controller('blog')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  /**
   *  Create a new blog
   * @param createBlogDto
   * @returns {Promise<GenericResponse<Blog>>}
   */
  @Post()
  create(@Body() createBlogDto: CreateBlogDto): Promise<GenericResponse<Blog>> {
    return this.blogService.create(createBlogDto);
  }

  /**
   * Find all blogs
   * @returns {Promise<GenericResponse<Blog[]>>}
   */
  @Get()
  findAll(): Promise<GenericResponse<Blog[]>> {
    return this.blogService.findAll();
  }

  /**
   * Find blog by id
   * @param id
   * @returns {Promise<GenericResponse<Blog>>}
   */
  @Get(':id')
  @UseInterceptors(UuidInterceptor)
  findOne(@Param('id') id: string): Promise<GenericResponse<Blog>> {
    return this.blogService.findOneById(id);
  }

  /**
   * Update blog
   * @param id
   * @param updateBlogDto
   * @returns {Promise<GenericResponse<UpdateResult>>}
   */
  @Patch(':id')
  @UseInterceptors(UuidInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto
  ): Promise<GenericResponse<UpdateResult>> {
    return this.blogService.update(id, updateBlogDto);
  }

  /**
   * Delete blog
   * @param id
   * @returns {Promise<GenericResponse<DeleteResult>>}
   */
  @Delete(':id')
  @UseInterceptors(UuidInterceptor)
  remove(@Param('id') id: string): Promise<GenericResponse<UpdateResult>> {
    return this.blogService.remove(id);
  }
}
