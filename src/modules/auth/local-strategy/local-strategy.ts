import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { GenericResponse } from 'src/common/generic-response/generic-response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Validate the user credentials and return the user object if valid credentials are provided. Otherwise, throw an error.
   * @param username
   * @param password
   * @returns {Promise<GenericResponse<any>>}
   */
  async validate(
    username: string,
    password: string
  ): Promise<GenericResponse<any>> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw GenericResponse.unauthorized<any>(null);
    }
    return user;
  }
}
