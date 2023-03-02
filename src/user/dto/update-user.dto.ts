import { Entity, Column } from 'typeorm';

@Entity()
export class UpdateUserDto {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;
}
