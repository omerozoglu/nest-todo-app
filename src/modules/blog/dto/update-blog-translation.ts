import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlogTranslationDto {
  @IsNotEmpty()
  languageId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
