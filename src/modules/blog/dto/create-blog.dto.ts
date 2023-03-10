import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateBlogTranslationDto } from './create-blog-translation copy';

export class CreateBlogDto {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  blogTranslations: CreateBlogTranslationDto[];
}
