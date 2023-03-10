import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    // minNumbers: 1,
  })
  password: string;
}
