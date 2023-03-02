import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

  async createTask(id: string, createTodoDto: CreateTodoDto) {
    createTodoDto.createdBy = id;
    return await this.repository.save(createTodoDto);
  }

  async findAllTask() {
    return await this.repository.find();
  }

  async findOneTaskById(id: string) {
    return await this.repository.findOne({ where: { uuid: id } });
  }

  async updateTask(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.repository.update(id, updateTodoDto);
  }

  async removeTask(id: string) {
    return await this.repository.delete(id);
  }
}
