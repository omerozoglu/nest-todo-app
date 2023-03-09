import { GenericResponse } from './../common/generic-response/generic-response';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json(GenericResponse.unauthorized('Token is required'));
    }

    const token = req.headers.authorization.split(' ')[1]; // Get token from header Authorization Bearer <token>

    if (token) {
      const isBlackListed = await this.cacheManager.get(
        'user-blacklist-' + token
      );

      if (isBlackListed) {
        return res
          .status(401)
          .json(GenericResponse.unauthorized('Token is blacklisted'));
      }
    }
    next();
  }
}
