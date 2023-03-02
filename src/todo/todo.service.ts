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

  //TODO Control the user if there is exist or not
  async createTask(id: string, createTodoDto: CreateTodoDto) {
    try {
      createTodoDto.createdBy = id;
      return await this.repository.save(createTodoDto);
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAllTask() {
    try {
      return await this.repository.find();
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAllCompletedTask() {
    try {
      return await this.repository.find({ where: { status: true } });
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAllTaskByUserId(id: string) {
    try {
      return await this.repository.find({ where: { createdBy: id } });
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAllCompletedTaskByUserId(id: string) {
    try {
      return await this.repository.find({
        where: { assignedTo: id, status: true },
      });
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOneTaskById(id: string) {
    try {
      return await this.repository.findOne({ where: { uuid: id } });
    } catch (error) {
      return { message: error.message };
    }
  }

  async updateTask(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      if (updateTodoDto.status) {
        updateTodoDto.completedDate = new Date();
      }
      return await this.repository.update(id, updateTodoDto);
    } catch (error) {
      return { message: error.message };
    }
  }

  async removeTask(id: string) {
    try {
      return await this.repository.softDelete(id);
    } catch (error) {
      return { message: error.message };
    }
  }
}
