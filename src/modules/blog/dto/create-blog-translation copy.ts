import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogTranslationDto {
  @IsNotEmpty()
  blogId: string;

  @IsNotEmpty()
  languageId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
