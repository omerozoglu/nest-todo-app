import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todos } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule { }
