import { PassportStrategy } from '@nestjs/passport';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Cache } from 'cache-manager';

/**
 *  JWT Strategy for validating the user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PRIVATE_KEY,
    });
  }

  /**
   *  Validate the user and return user object to the request object (req.user) if the user is valid else return null
   * @param payload
   * @returns {Promise<any>}
   */
  async validate(payload: any) {
    const user = await this.cacheManager.get('user-' + payload.username);
    if (user) return user;

    return null;
  }
}
