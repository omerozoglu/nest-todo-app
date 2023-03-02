import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';
import { Entity, Column } from 'typeorm';

@Entity()
export class CreateUserDto {
  @IsOptional()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @IsEmail()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    // minNumbers: 1,
  })
  @Column({ type: 'varchar', length: 255 })
  password: string;
}
