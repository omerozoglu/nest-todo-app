import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { Repository, UpdateResult } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguageService {
  @InjectRepository(Language)
  private readonly repository: Repository<Language>;

  /**
   * Create a new language
   * @param createLanguageDto
   * @returns {GenericResponse<Language>}
   */
  async create(
    createLanguageDto: CreateLanguageDto
  ): Promise<GenericResponse<Language>> {
    const response = await this.repository.save(createLanguageDto);
    if (!response) {
      throw GenericResponse.notAcceptable<Language>(
        null,
        'Language not created'
      );
    }
    return GenericResponse.created<Language>(response, 'Language created');
  }

  /**
   * Find all languages
   * @returns {GenericResponse<Language[]>}
   */
  async findAll(): Promise<GenericResponse<Language[]>> {
    const response = await this.repository.find();
    if (!response) {
      throw GenericResponse.notFound<Language[]>(null, 'Languages not found');
    }
    return GenericResponse.success<Language[]>(response, 'Languages found');
  }

  /**
   * Find language by id
   * @param id
   * @returns {GenericResponse<Language>}
   */
  async findOneById(id: string): Promise<GenericResponse<Language>> {
    const response = await this.repository.findOne({ where: { uuid: id } });
    if (!response) {
      throw GenericResponse.notFound<Language>(null, 'Language not found');
    }
    return GenericResponse.success<Language>(response, 'Language found');
  }

  /**
   * Update language by id
   * @param id
   * @param updateLanguageDto
   * @returns {GenericResponse<UpdateResult>}
   */
  async update(
    id: string,
    updateLanguageDto: UpdateLanguageDto
  ): Promise<GenericResponse<UpdateResult>> {
    const response = await this.repository.update(id, updateLanguageDto);
    if (!response) {
      throw GenericResponse.notAcceptable<Language>(
        null,
        'Language not updated'
      );
    }
    return GenericResponse.success<UpdateResult>(response, 'Language updated');
  }

  /**
   * Remove language by id
   * @param id
   * @returns {GenericResponse<UpdateResult>}
   */
  async remove(id: string): Promise<GenericResponse<UpdateResult>> {
    const isLanguageExist = await this.repository.findOne({
      where: { uuid: id },
    });
    if (!isLanguageExist) {
      throw GenericResponse.notFound<Language>(null, 'Language not found');
    }

    const response = await this.repository.softDelete(id);
    if (!response || response.affected === 0) {
      throw GenericResponse.notAcceptable<Language>(
        null,
        'Language not deleted'
      );
    }
    return GenericResponse.success<UpdateResult>(response, 'Language deleted');
  }
}
