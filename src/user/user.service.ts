import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async createUser(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findAllUser() {
    return await this.repository.find();
  }

  async findOneUserById(id: string) {
    return await this.repository.findOne({ where: { uuid: id } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.repository.update(id, updateUserDto);
  }

  async removeUser(id: string) {
    return await this.repository.delete(id);
  }
}
