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
import { UseFilters } from '@nestjs/common/decorators';
import { HttpExceptionFilter } from 'src/common/http-exception/http-exception.filter';

@Controller('todo')
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
  findAll() {
    return this.todoService.findAll();
  }

  /**
   * Find all completed task
   * @returns {GenericResponse<Todo[]>}
   */
  @Get('completed')
  findAllCompleted() {
    return this.todoService.findAllCompleted();
  }

  /**
   *  Find all completed task by user id
   * @param id
   * @returns {GenericResponse<Todo[]>}
   */
  @Get('user/completed/:id')
  findAllCompletedByUserId(@Param('id') id: string) {
    return this.todoService.findAllCompletedByUserId(id);
  }

  /**
   * Find all task by user id
   * @param id
   * @returns {GenericResponse<Todo>}
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOneById(id);
  }

  /**
   * Find all task by user id
   * @param id
   * @returns {GenericResponse<Todo[]>}
   */
  @Get('user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.todoService.findAllByUserId(id);
  }

  /**
   * Update task
   * @param id
   * @param updateTodoDto
   * @returns {GenericResponse<Todo>}
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  /**
   * Delete task
   * @param id
   * @returns {GenericResponse<Todo>}
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
