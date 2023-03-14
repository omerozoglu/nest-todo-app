import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUUID()
  @IsOptional()
  parentId: number;

  parent: CreateMenuDto[];
}
