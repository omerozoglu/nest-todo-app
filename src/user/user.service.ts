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
    const user = await this.repository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw GenericResponse.notAcceptable(null, 'User already exist');
    }
    const response = await this.repository.save(createUserDto);
    return GenericResponse.created(response);
  }

  /**
   *
   * @returns {Promise<GenericResponse<User[]>>}
   */
  async findAllUser(): Promise<GenericResponse<User[]>> {
    const response = await this.repository.find();
    return GenericResponse.success(response);
  }

  /**
   *
   * @param id
   * @returns {Promise<GenericResponse<User>>}
   */
  async findOneUserById(id: string): Promise<GenericResponse<User>> {
    const user = await this.repository.findOne({ where: { uuid: id } });
    if (!user) {
      throw GenericResponse.notFound(null, 'User not found');
    }
    return GenericResponse.success(user);
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
    const user = await this.repository.findOne({ where: { uuid: id } });
    if (!user) {
      throw GenericResponse.notFound(null, 'User not found');
    }
    const response = await this.repository.update(id, updateUserDto);
    return GenericResponse.success(response);
  }

  /**
   * ? what should be the return type here?
   * @param id
   * @returns {Promise<GenericResponse<UpdateResult>>}
   */
  async removeUser(id: string): Promise<GenericResponse<UpdateResult>> {
    const isUserExist = await this.repository.exist({
      where: { uuid: id },
    });

    if (!isUserExist) {
      throw GenericResponse.notFound(null, 'User not found');
    }

    const response = await this.repository.softDelete(id);
    if (response.affected === 0) {
      throw GenericResponse.notFound(null, 'User not found');
    }

    return GenericResponse.success(response);
  }
}
