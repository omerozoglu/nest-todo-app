import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { User } from 'src/user/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
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
   * @returns {GenericResponse<Todo>}
   */
  async create(
    id: string,
    createTodoDto: CreateTodoDto
  ): Promise<GenericResponse<Todo>> {
    const user = await this.userRepo.findOne({ where: { uuid: id } });
    if (!user) throw GenericResponse.notFound<User>(null, "User doesn't exist");
    createTodoDto.createdBy = id;
    const response = await this.repository.save(createTodoDto);
    return GenericResponse.created<Todo>(response, 'Task created');
  }

  /**
   * Find all task
   * @returns {GenericResponse<Todo[]>}
   */
  async findAll(): Promise<GenericResponse<Todo[]>> {
    const response = await this.repository.find();
    return GenericResponse.success<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find all completed task
   * @returns {GenericResponse<Todo[]>}
   */
  async findAllCompleted(): Promise<GenericResponse<Todo[]>> {
    const response = await this.repository.find({ where: { status: true } });
    return GenericResponse.success<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find all task by user id
   * @param id
   * @returns {GenericResponse<Todo>}
   */
  async findAllByUserId(id: string): Promise<GenericResponse<Todo[]>> {
    const isUserExist = await this.userRepo.exist({ where: { uuid: id } });
    if (!isUserExist) {
      throw GenericResponse.notFound<User>(null, "User doesn't exist");
    }
    const response = await this.repository.find({ where: { createdBy: id } });
    return GenericResponse.success<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find all completed task by user id
   * @param id
   * @returns {GenericResponse<Todo[]>}
   */
  async findAllCompletedByUserId(id: string): Promise<GenericResponse<Todo[]>> {
    const isUserExist = await this.userRepo.exist({ where: { uuid: id } });
    if (!isUserExist) {
      throw GenericResponse.notFound<User>(null, "User doesn't exist");
    }
    const response = await this.repository.find({
      where: { createdBy: id, status: true },
    });
    return GenericResponse.success<Todo[]>(response, 'Tasks found');
  }

  /**
   * Find task by id
   * @param id
   * @returns  {GenericResponse<Todo>}
   */
  async findOneById(id: string): Promise<GenericResponse<Todo>> {
    const response = await this.repository.findOne({ where: { uuid: id } });
    if (!response) {
      throw GenericResponse.notFound<Todo>(null, 'Task not found');
    }
    return GenericResponse.success<Todo>(response, 'Task found');
  }

  /**
   * Update task
   * @param id
   * @param updateTodoDto
   * @returns {GenericResponse<Todo>}
   */
  async update(
    id: string,
    updateTodoDto: UpdateTodoDto
  ): Promise<GenericResponse<Todo>> {
    if (updateTodoDto.status) {
      updateTodoDto.completedDate = new Date();
    }
    const response = await this.repository.update(id, updateTodoDto);
    if (response.affected === 0) {
      throw GenericResponse.notFound<User>(null, 'Task not found');
    }
    const updatedTask = await this.repository.findOne({ where: { uuid: id } });
    return GenericResponse.success<Todo>(
      updatedTask,
      'Task updated successfully'
    );
  }

  /**
   * Soft delete
   * @param id
   * @returns {GenericResponse<UpdateResult>}
   */
  async remove(id: string): Promise<GenericResponse<UpdateResult>> {
    const IsTaskExist = await this.repository.exist({ where: { uuid: id } });
    if (!IsTaskExist) {
      throw GenericResponse.notFound<Todo>(null, 'Task not found');
    }
    const response = await this.repository.softDelete(id);

    if (response.affected === 0) {
      throw GenericResponse.notFound<Todo>(null, 'Task not found');
    }
    return GenericResponse.success<UpdateResult>(
      response,
      'Task deleted successfully'
    );
  }
}
