import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Cache } from 'cache-manager';
import { GenericResponse } from 'src/common/generic-response/generic-response';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  /**
   * Login user and return JWT token
   * @param req
   * @returns {Promise<any>}
   */
  @Post('login')
  @UseGuards(LocalAuthGuard) // Use local strategy to validate user credentials
  async login(
    @Request() req
  ): Promise<GenericResponse<{ access_token: string }>> {
    const payload = { ...req.user, expire_at: process.env.REDIS_TTL }; // Prepare payload for cache
    await this.cacheManager.set('user-' + req.user.username, payload); // Set cache for user data with expire time
    return this.authService.login(req.user); // Return JWT token
  }

  /**
   * Logout user and delete cache
   * @param req
   * @returns {Promise<any>}
   */
  @Post('logout')
  async logout(@Request() req): Promise<GenericResponse<string>> {
    const token = req.headers.authorization.split(' ')[1]; // Get bearer token from header
    const decodedJwt = this.authService.decodeJwt(token); // Decode JWT token to get username from payload
    await this.cacheManager.set('user-blacklist-' + token, true); // Set cache for user blacklist with token as key
    await this.cacheManager.del('user-' + decodedJwt.username); // Delete cache for user data
    return this.authService.logout(); // Return success response
  }

  /**
   * Register user and return JWT token
   * @param createUserDto
   * @returns {Promise<GenericResponse<User>}
   */
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<GenericResponse<any>> {
    return this.authService.Register(createUserDto); // Return user data
  }

  @Post('refresh-token')
  async refreshToken(
    @Request() req
  ): Promise<GenericResponse<{ access_token: string }>> {
    const token = req.headers.authorization.split(' ')[1]; // Get bearer token from header
    const decodedJwt = this.authService.decodeJwt(token); // Decode JWT token to get username from payload
    const user = await this.cacheManager.get('user-' + decodedJwt.username); // Get user data from cache
    // Check if user is not exist or token is blacklisted
    if (!user || (await this.cacheManager.get('user-blacklist-' + token))) {
      throw GenericResponse.unauthorized('Unauthorized');
    }
    // Delete cache for user blacklist
    await this.cacheManager.set('user-blacklist-' + token, true); // Set cache for user blacklist with token as key
    return this.authService.login(decodedJwt); // Return JWT token
  }
}
