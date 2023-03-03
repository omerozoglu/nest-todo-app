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
   *
   * @param id
   * @param createTodoDto
   * @returns {GenericResponse<Todo>}
   */
  async createTask(
    id: string,
    createTodoDto: CreateTodoDto
  ): Promise<GenericResponse<Todo>> {
    const user = await this.userRepo.findOne({ where: { uuid: id } });
    if (!user) throw GenericResponse.notFound(null, "User doesn't exist");
    createTodoDto.createdBy = id;
    const response = await this.repository.save(createTodoDto);
    return GenericResponse.created(response);
  }

  /**
   *
   * @returns {GenericResponse<Todo[]>}
   */
  async findAllTask(): Promise<GenericResponse<Todo[]>> {
    const response = await this.repository.find();
    return GenericResponse.success(response);
  }

  /**
   *
   * @returns {GenericResponse<Todo[]>}
   */
  async findAllCompletedTask(): Promise<GenericResponse<Todo[]>> {
    const response = await this.repository.find({ where: { status: true } });
    return GenericResponse.success(response);
  }

  /**
   *
   * @param id
   * @returns {GenericResponse<Todo>}
   */
  async findAllTaskByUserId(id: string): Promise<GenericResponse<Todo[]>> {
    const user = await this.userRepo.findOne({ where: { uuid: id } });
    if (!user) {
      throw GenericResponse.notFound(null, "User doesn't exist");
    }
    const response = await this.repository.find({ where: { createdBy: id } });
    return GenericResponse.success(response);
  }

  /**
   *
   * @param id
   * @returns {GenericResponse<Todo[]>}
   */
  async findAllCompletedTaskByUserId(
    id: string
  ): Promise<GenericResponse<Todo[]>> {
    const user = await this.userRepo.findOne({ where: { uuid: id } });
    if (!user) {
      throw GenericResponse.notFound(null, "User doesn't exist");
    }
    const response = await this.repository.find({
      where: { createdBy: id, status: true },
    });
    return GenericResponse.success(response);
  }

  /**
   *
   * @param id
   * @returns  {GenericResponse<Todo>}
   */
  async findOneTaskById(id: string): Promise<GenericResponse<Todo>> {
    const response = await this.repository.findOne({ where: { uuid: id } });
    if (!response) {
      throw GenericResponse.notFound(null, 'Task not found');
    }
    return GenericResponse.success(response);
  }

  /**
   *
   * @param id
   * @param updateTodoDto
   * @returns {GenericResponse<UpdateResult>}
   */
  async updateTask(
    id: string,
    updateTodoDto: UpdateTodoDto
  ): Promise<GenericResponse<UpdateResult>> {
    if (updateTodoDto.status) {
      updateTodoDto.completedDate = new Date();
    }
    const response = await this.repository.update(id, updateTodoDto);
    if (response.affected === 0) {
      throw GenericResponse.notFound(null, 'Task not found');
    }
    const updatedTask = await this.repository.findOne({ where: { uuid: id } });
    return GenericResponse.success(updatedTask, 'Task updated successfully');
  }

  /**
   *
   * @param id
   * @returns {GenericResponse<UpdateResult>}
   */
  async removeTask(id: string): Promise<GenericResponse<UpdateResult>> {
    const IsTaskExist = await this.repository.exist({ where: { uuid: id } });
    if (!IsTaskExist) {
      throw GenericResponse.notFound(null, 'Task not found');
    }
    const response = await this.repository.softDelete(id);

    if (response.affected === 0) {
      throw GenericResponse.notFound(null, 'Task not found');
    }
    return GenericResponse.success(response, 'Task deleted successfully');
  }
}
