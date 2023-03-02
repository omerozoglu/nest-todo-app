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
    try {
      const user = await this.repository.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        return { message: 'User already exists' };
      }
      return await this.repository.save(createUserDto);
    } catch (error) {
      return { message: 'Error creating user' };
    }
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
