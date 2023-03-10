import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

//! TODO:
@Entity()
export class CreateLanguageDto {
  @IsNotEmpty({ message: 'Code is required' })
  @IsString()
  @Column()
  code: string;
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @Column()
  name: string;
  @IsBoolean()
  @Column()
  status: boolean;
}
