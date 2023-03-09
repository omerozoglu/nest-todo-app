import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UseFilters, UseGuards } from '@nestjs/common/decorators';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todo')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Create task
   * @param id
   * @param createTodoDto
   * @returns  {GenericResponse<Todo>}
   */
  @Post(':id')
  async create(@Param('id') id: string, @Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(id, createTodoDto);
  }

  /**
   * Find all task
   * @returns {GenericResponse<Todo[]>}
   */
  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  /**
   * Find all completed task
   * @returns {GenericResponse<Todo[]>}
   */
  @Get('completed')
  async findAllCompleted() {
    return await this.todoService.findAllCompleted();
  }

  /**
   *  Find all completed task by user id
   * @param id
   * @returns {GenericResponse<Todo[]>}
   */
  @Get('user/completed/:id')
  async findAllCompletedByUserId(@Param('id') id: string) {
    return await this.todoService.findAllCompletedByUserId(id);
  }

  /**
   * Find all task by user id
   * @param id
   * @returns {GenericResponse<Todo>}
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOneById(id);
  }

  /**
   * Find all task by user id
   * @param id
   * @returns {GenericResponse<Todo[]>}
   */
  @Get('user/:id')
  async findAllByUserId(@Param('id') id: string) {
    return await this.todoService.findAllByUserId(id);
  }

  /**
   * Update task
   * @param id
   * @param updateTodoDto
   * @returns {GenericResponse<Todo>}
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(id, updateTodoDto);
  }

  /**
   * Delete task
   * @param id
   * @returns {GenericResponse<Todo>}
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todoService.remove(id);
  }
}
