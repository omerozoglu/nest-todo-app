import { IsEmail } from 'class-validator';
import { Entity, Column } from 'typeorm';

@Entity()
export class CreateUserDto {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @IsEmail()
    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;
}
