import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApiResponse,
  NotFoundResponse,
  SuccessResponse,
} from 'src/common/generic-response/api-response';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

  @InjectRepository(User)
  private readonly userRepo: Repository<Todo>;

  /**
   * Create task
   * @param id
   * @param createTodoDto
   * @returns {ApiResponse<Todo>}
   */
  async create(
    id: string,
    createTodoDto: CreateTodoDto
  ): Promise<ApiResponse<Todo>> {
    const user = await this.userRepo.findOne({ where: { uuid: id } });
    if (!user) throw GenericResponse.notFound<User>(null, "User doesn't exist");
    createTodoDto.createdBy = id;
    const response = await this.repository.save(createTodoDto);
    return new SuccessResponse<Todo>(response, 'Task created');
  }

  /**
   * Find all task
   * @returns {ApiResponse<Todo[]>}
   */
  async findAll(): Promise<ApiResponse<Todo[]>> {
    const response = await this.repository.find();
    return new SuccessResponse<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find all completed task
   * @returns {ApiResponse<Todo[]>}
   */
  async findAllCompleted(): Promise<ApiResponse<Todo[]>> {
    const response = await this.repository.find({ where: { status: true } });
    return new SuccessResponse<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find all task by user id
   * @param id
   * @returns {ApiResponse<Todo>}
   */
  async findAllByUserId(id: string): Promise<ApiResponse<Todo[]>> {
    const isUserExist = await this.userRepo.exist({ where: { uuid: id } });
    if (!isUserExist) {
      throw GenericResponse.notFound<User>(null, "User doesn't exist");
    }
    const response = await this.repository.find({ where: { createdBy: id } });
    return new SuccessResponse<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find all completed task by user id
   * @param id
   * @returns {ApiResponse<Todo[]>}
   */
  async findAllCompletedByUserId(id: string): Promise<ApiResponse<Todo[]>> {
    const isUserExist = await this.userRepo.exist({ where: { uuid: id } });
    if (!isUserExist) {
      throw new NotFoundResponse<User>("User doesn't exist");
    }
    const response = await this.repository.find({
      where: { createdBy: id, status: true },
    });
    return new SuccessResponse<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find task by id
   * @param id
   * @returns  {ApiResponse<Todo>}
   */
  async findOneById(id: string): Promise<ApiResponse<Todo>> {
    const response = await this.repository.findOne({ where: { uuid: id } });
    if (!response) {
      throw new NotFoundResponse<Todo>('Task not found');
    }
    return new SuccessResponse<Todo>(response, 'Task found');
  }

  /**
   * Update task
   * @param id
   * @param updateTodoDto
   * @returns {ApiResponse<Todo>}
   */
  async update(
    id: string,
    updateTodoDto: UpdateTodoDto
  ): Promise<ApiResponse<Todo>> {
    if (updateTodoDto.status) {
      updateTodoDto.completedDate = new Date();
    }
    const response = await this.repository.update(id, updateTodoDto);
    if (response.affected === 0) {
      throw new NotFoundResponse<Todo>('Task not found');
    }
    const updatedTask = await this.repository.findOne({ where: { uuid: id } });
    return new SuccessResponse<Todo>(updatedTask, 'Task updated');
  }

  /**
   * Soft delete
   * @param id
   * @returns {ApiResponse<UpdateResult>}
   */
  async remove(id: string): Promise<ApiResponse<UpdateResult>> {
    const IsTaskExist = await this.repository.exist({ where: { uuid: id } });
    if (!IsTaskExist) {
      throw new NotFoundResponse<Todo>('Task not found');
    }
    const response = await this.repository.softDelete(id);

    if (response.affected === 0) {
      throw new NotFoundResponse<Todo>('Task not found');
    }
    return new SuccessResponse<UpdateResult>(response, 'Task deleted');
  }
}
