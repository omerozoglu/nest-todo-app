import {
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UuidInterceptor } from 'src/common/uuid/uuid.interceptor';

@Controller('user')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new user
   * @param createUserDto
   * @returns {Promise<GenericResponse<User>>}
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   * Find all users
   * @returns {Promise<GenericResponse<User[]>>}
   */
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * Find user by id
   * @param id
   * @returns {Promise<GenericResponse<User>>}
   */
  @Get(':id')
  @UseInterceptors(UuidInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  /**
   * Update user
   * @param id
   * @param updateUserDto
   * @returns {Promise<GenericResponse<UpdateResult>>}
   */
  @Patch(':id')
  @UseInterceptors(UuidInterceptor)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  /**
   * Delete user
   * @param id
   * @returns {Promise<GenericResponse<DeleteResult>>}
   */
  @Delete(':id')
  @UseInterceptors(UuidInterceptor)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
