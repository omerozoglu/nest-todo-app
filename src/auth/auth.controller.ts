import {
  CACHE_MANAGER,
  Controller,
  Inject,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/http-exception/http-exception.filter';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Cache } from 'cache-manager';

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
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    // Prepare payload for cache
    const payload = {
      ...req.user,
      expire_at: process.env.REDIS_TTL,
    };

    // Set cache for user data with expire time
    await this.cacheManager.set('user::' + req.user.username, payload);

    // Return JWT token
    return this.authService.login(req.user);
  }

  /**
   * Logout user
   * @param req
   * @returns {Promise<any>}
   */
  @Post('logout')
  async logout(@Request() req) {
    // Get bare token from header
    const token = req.headers.authorization.split(' ')[1];

    const decodedJwt = this.authService.decodeJwt(token);

    await this.cacheManager.set('user-blacklist' + decodedJwt.username, token);
    // Delete cache for user data

    await this.cacheManager.del('user::' + decodedJwt.username);

    // Return success response
    return {
      status: 200,
      message: 'Logout success',
    };
  }
}
