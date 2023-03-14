import { Injectable } from '@nestjs/common';
import { UseFilters } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import {
  ApiResponse,
  CreatedResponse,
  NotFoundResponse,
  SuccessResponse,
} from 'src/common/generic-response/api-response';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly repository: Repository<Menu>
  ) {}

  /**
   * Create a new menu
   * @param createMenuDto
   * @returns {Promise<ApiResponse<Menu>>}
   */
  async create(createMenuDto: CreateMenuDto): Promise<ApiResponse<Menu>> {
    const result = await this.repository.save(createMenuDto);
    return new CreatedResponse<Menu>(result);
  }

  /**
   * Find all menus
   * @returns {Promise<ApiResponse<Menu[]>>}
   */
  async findAll(): Promise<ApiResponse<Menu[]>> {
    const result = await this.repository.find();
    if (!result || result.length < 1) {
      throw new NotFoundResponse('Menu not found');
    }
    return new SuccessResponse<Menu[]>(result, 'Menu found');
  }

  /**
   * Find a menu by id (uuid)
   * @param id
   * @returns {Promise<ApiResponse<Menu>>}
   */
  async findOne(id: string): Promise<ApiResponse<Menu>> {
    const result = await this.repository.findOne({ where: { uuid: id } });
    if (!result) {
      throw new NotFoundResponse('Menu not found');
    }
    return new SuccessResponse<Menu>(result, 'Menu found');
  }

  /**
   * Update a menu by id (uuid)
   * @param id
   * @param updateMenuDto
   * @returns {Promise<ApiResponse<null>>}
   */
  async update(
    id: string,
    updateMenuDto: UpdateMenuDto
  ): Promise<ApiResponse<null>> {
    const result = await this.repository.update(id, updateMenuDto);
    if (!result) {
      throw new NotFoundResponse('Menu not found');
    }
    return new SuccessResponse<null>(null, 'Menu updated');
  }

  /**
   * Delete a menu by id (uuid)
   * @param id
   * @returns {Promise<ApiResponse<null>>}
   */
  async remove(id: string): Promise<ApiResponse<null>> {
    const result = await this.repository.softDelete(id);
    if (!result) {
      throw new NotFoundResponse('Menu not found');
    }
    return new SuccessResponse<null>(null, 'Menu deleted');
  }
}
