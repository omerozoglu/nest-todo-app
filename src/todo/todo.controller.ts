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
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTask(id, createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAllTask();
  }

  @Get('completed')
  findAllCompleted() {
    return this.todoService.findAllCompletedTask();
  }

  @Get('user/completed/:id')
  findAllCompletedByUserId(@Param('id') id: string) {
    return this.todoService.findAllCompletedTaskByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOneTaskById(id);
  }

  @Get('user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.todoService.findAllTaskByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTask(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.removeTask(id);
  }
}
