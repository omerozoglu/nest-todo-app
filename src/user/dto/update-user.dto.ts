import { IsOptional, IsStrongPassword } from 'class-validator';
import { Entity, Column } from 'typeorm';

@Entity()
export class UpdateUserDto {
  @IsOptional()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    // minNumbers: 1,
  })
  @Column({ type: 'varchar', length: 255 })
  password: string;
}
