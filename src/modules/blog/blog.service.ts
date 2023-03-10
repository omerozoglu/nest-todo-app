import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogTranslation } from './entities/blog-translation';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  @InjectRepository(Blog)
  private readonly repository: Repository<Blog>;

  @InjectRepository(BlogTranslation)
  private readonly blogTranslationRepository: Repository<BlogTranslation>;

  /**
   * Create blog with blog translations and return created blog with blog translations
   * @param createBlogDto
   * @returns {Promise<GenericResponse<Blog>>}
   */
  async create(createBlogDto: CreateBlogDto): Promise<GenericResponse<Blog>> {
    const response = await this.repository.save(createBlogDto);
    if (!response) {
      throw GenericResponse.notAcceptable<Blog>(null, 'Blog not created');
    }

    if (response.blogTranslations.length < 1) {
      throw GenericResponse.notAcceptable<Blog>(
        null,
        'Blog translations not created'
      );
    }
    await Promise.all(
      response.blogTranslations.map(async (blogTranslation) => {
        blogTranslation.blogId = response.uuid;
        const blogTranslationResponse =
          await this.blogTranslationRepository.save(blogTranslation);

        if (!blogTranslationResponse)
          throw GenericResponse.notAcceptable<Blog>(
            null,
            'Blog translation not created'
          );

        response.blogTranslations.find(
          (blogTranslation) =>
            blogTranslation.languageId === blogTranslationResponse.languageId
        ).blogId = blogTranslationResponse.blogId;
      })
    );

    return GenericResponse.created<Blog>(response, 'Blog created');
  }

  /**
   * Find all blogs with blog translations
   * @returns {Promise<GenericResponse<Blog[]>>}
   */
  async findAll(): Promise<GenericResponse<Blog[]>> {
    const response = await this.repository.find({
      relations: ['blogTranslations'],
    });

    if (!response || response.length < 1) {
      throw GenericResponse.notFound('Blogs not found');
    }

    return GenericResponse.success<Blog[]>(response, 'Blogs found');
  }

  /**
   * Find blog by id
   * @param id
   * @returns {Promise<GenericResponse<Blog>>}
   */
  async findOneById(id: string): Promise<GenericResponse<Blog>> {
    const response = await this.repository.findOne({ where: { uuid: id } });
    if (!response) {
      throw GenericResponse.notFound<Blog>(null, 'Blog not found');
    }
    const blogTranslations = await this.blogTranslationRepository.find({
      where: { blogId: response.uuid },
    });
    response.blogTranslations = blogTranslations;

    return GenericResponse.success<Blog>(response, 'Blog found');
  }

  /**
   * Update blog by id
   * @param id
   * @param updateBlogDto
   * @returns {Promise<GenericResponse<Blog>>}
   */
  async update(
    id: string,
    updateBlogDto: UpdateBlogDto
  ): Promise<GenericResponse<UpdateResult>> {
    const response = await this.repository.findOne({ where: { uuid: id } });
    if (!response) {
      throw GenericResponse.notFound<Blog>(null, 'Blog not found');
    }

    const { status } = updateBlogDto;
    const updateResult = await this.repository.update({ uuid: id }, { status });

    if (!updateResult.affected) {
      throw GenericResponse.notFound<Blog>(null, 'Blog not found');
    }

    if (updateBlogDto.blogTranslations.length > 0) {
      await this.blogTranslationRepository.softDelete({ blogId: id });

      const updatedTranslations = await Promise.all(
        updateBlogDto.blogTranslations.map(async (translation) => {
          translation.blogId = id;
          const updatedTranslation = await this.blogTranslationRepository.save(
            translation
          );

          if (!updatedTranslation) {
            throw GenericResponse.notAcceptable<Blog>(
              null,
              'Blog translation not created'
            );
          }

          return updatedTranslation;
        })
      );

      response.blogTranslations = updatedTranslations;
    }

    return GenericResponse.success<UpdateResult>(updateResult, 'Blog updated');
  }

  /**
   * Remove blog by id
   * @param id
   * @returns {Promise<GenericResponse<Blog>>}
   */
  async remove(id: string): Promise<GenericResponse<UpdateResult>> {
    const isBlogExist = await this.repository.exist({ where: { uuid: id } });
    if (!isBlogExist) {
      throw GenericResponse.notFound<Blog>(null, 'Blog not found');
    }

    const blogTranslations = await this.blogTranslationRepository.find({
      where: { blogId: id },
    });
    if (blogTranslations.length > 0) {
      await this.blogTranslationRepository.softRemove(blogTranslations);
    }
    const response = await this.repository.softDelete(id);
    if (!response || response.affected === 0) {
      throw GenericResponse.notAcceptable<Blog>(null, 'Blog not deleted');
    }

    return GenericResponse.success<UpdateResult>(response, 'Blog deleted');
  }
}
