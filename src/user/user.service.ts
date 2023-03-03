import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  /**
   *
   * @param createUserDto
   * @returns {Promise<GenericResponse<User>>}
   */
  async createUser(
    createUserDto: CreateUserDto
  ): Promise<GenericResponse<User>> {
    try {
      const user = await this.repository.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        return GenericResponse.notAcceptable(null, 'User already exist');
      }
      const response = await this.repository.save(createUserDto);
      return GenericResponse.created(response);
    } catch (error) {
      return GenericResponse.internalServerError(error.message);
    }
  }

  /**
   *
   * @returns {Promise<GenericResponse<User[]>>}
   */
  async findAllUser(): Promise<GenericResponse<User[]>> {
    try {
      const response = await this.repository.find();
      return GenericResponse.success(response);
    } catch (error) {
      return GenericResponse.internalServerError(error.message);
    }
  }

  /**
   *
   * @param id
   * @returns {Promise<GenericResponse<User>>}
   */
  async findOneUserById(id: string): Promise<GenericResponse<User>> {
    try {
      const user = await this.repository.findOne({ where: { uuid: id } });
      if (!user) {
        return GenericResponse.notFound(null, 'User not found');
      }
      return GenericResponse.success(user);
    } catch (error) {
      return GenericResponse.internalServerError(error.message);
    }
  }

  //Type Orm generic type
  /**
   * ? what should be the return type here?
   * @param id
   * @param updateUserDto
   * @returns  {Promise<GenericResponse<UpdateResult>>}
   */
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<GenericResponse<UpdateResult>> {
    try {
      const user = await this.repository.findOne({ where: { uuid: id } });
      if (!user) {
        return GenericResponse.notFound(null, 'User not found');
      }
      const response = await this.repository.update(id, updateUserDto);
      return GenericResponse.success(response);
    } catch (error) {
      return GenericResponse.internalServerError(error.message);
    }
  }

  /**
   * ? what should be the return type here?
   * @param id
   * @returns {Promise<GenericResponse<UpdateResult>>}
   */
  async removeUser(id: string) {
    try {
      const user = await this.repository.findOne({ where: { uuid: id } });
      if (!user) {
        return GenericResponse.notFound(null, 'User not found');
      }
      const response = await this.repository.softDelete(id);
      return GenericResponse.success(response);
    } catch (error) {
      return GenericResponse.internalServerError(error.message);
    }
  }
}
