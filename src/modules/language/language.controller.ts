import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { Language } from './entities/language.entity';
import { UpdateResult } from 'typeorm';

@Controller('language')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  /**
   * Create a new language
   * @param createLanguageDto
   * @returns {GenericResponse<Language>}
   */
  @Post()
  create(
    @Body() createLanguageDto: CreateLanguageDto
  ): Promise<GenericResponse<Language>> {
    return this.languageService.create(createLanguageDto);
  }

  /**
   * Find all languages
   * @returns {GenericResponse<Language[]>}
   */
  @Get()
  findAll(): Promise<GenericResponse<Language[]>> {
    return this.languageService.findAll();
  }

  /**
   * Find language by id
   * @param id
   * @returns {GenericResponse<Language>}
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GenericResponse<Language>> {
    return this.languageService.findOneById(id);
  }

  /**
   * Update language by id
   * @param id
   * @param updateLanguageDto
   * @returns {GenericResponse<UpdateResult>}
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ): Promise<GenericResponse<UpdateResult>> {
    return this.languageService.update(id, updateLanguageDto);
  }

  /**
   * Delete language by id
   * @param id
   * @returns {GenericResponse<UpdateResult>}
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<GenericResponse<UpdateResult>> {
    return this.languageService.remove(id);
  }
}
