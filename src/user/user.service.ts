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
    try {
      return await this.repository.find();
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOneUserById(id: string) {
    try {
      return await this.repository.findOne({ where: { uuid: id } });
    } catch (error) {
      return { message: error.message };
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.repository.update(id, updateUserDto);
    } catch (error) {
      return { message: error.message };
    }
  }

  async removeUser(id: string) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      return { message: error.message };
    }
  }
}
