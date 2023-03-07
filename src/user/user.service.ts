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
   * Create a new user
   * @param createUserDto
   * @returns {Promise<GenericResponse<User>>}
   */
  async create(createUserDto: CreateUserDto): Promise<GenericResponse<User>> {
    const user = await this.repository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw GenericResponse.notAcceptable<User>(null, 'User already exist');
    }
    const response = await this.repository.save(createUserDto);
    return GenericResponse.created<User>(response, 'User created');
  }

  /**
   * Find all users
   * @returns {Promise<GenericResponse<User[]>>}
   */
  async findAll(): Promise<GenericResponse<User[]>> {
    const response = await this.repository.find();
    return GenericResponse.success<User[]>(response, 'Users found');
  }

  /**
   * Find user by id
   * @param id
   * @returns {Promise<GenericResponse<User>>}
   */
  async findOneById(id: string): Promise<GenericResponse<User>> {
    const user = await this.repository.findOne({ where: { uuid: id } });
    if (!user) {
      throw GenericResponse.notFound<User>(null, 'User not found');
    }
    return GenericResponse.success<User>(user, 'User found');
  }

  /**
   * Find user by username
   * @param username
   * @returns {Promise<GenericResponse<User>>}
   */
  async findOneByUsername(username: string): Promise<GenericResponse<User>> {
    const user = await this.repository.findOne({ where: { username } });
    if (!user) {
      throw GenericResponse.notFound<User>(null, 'User not found');
    }
    return GenericResponse.success<User>(user, 'User found');
  }

  /**
   * Update user by id
   * @param id
   * @param updateUserDto
   * @returns  {Promise<GenericResponse<UpdateResult>>}
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<GenericResponse<UpdateResult>> {
    const isUserExist = await this.repository.exist({ where: { uuid: id } });
    if (!isUserExist) {
      throw GenericResponse.notFound<User>(null, 'User not found');
    }
    const response = await this.repository.update(id, updateUserDto);
    return GenericResponse.success<UpdateResult>(response, 'User updated');
  }

  /**
   * Delete user
   * @param id
   * @returns {Promise<GenericResponse<UpdateResult>>}
   */
  async remove(id: string): Promise<GenericResponse<UpdateResult>> {
    const isUserExist = await this.repository.exist({
      where: { uuid: id },
    });

    if (!isUserExist) {
      throw GenericResponse.notFound<User>(null, 'User not found');
    }

    const response = await this.repository.softDelete(id);
    if (response.affected === 0) {
      throw GenericResponse.notFound<User>(null, 'User not found');
    }

    return GenericResponse.success<UpdateResult>(response, 'User deleted');
  }
}
