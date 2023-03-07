import { GenericResponse } from './../common/generic-response/generic-response';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * Validate user by username and password
   * @param username
   * @param pass
   * @returns {Promise<any>}
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const response = await this.userService.findOneByUsername(username);
    const user = response.data;
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   *  Login user and return JWT token
   * @param user
   * @returns {Promise<any>}
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.uuid };

    return GenericResponse.created({
      access_token: this.jwtService.sign(payload),
      user,
    });
  }

  /**
   *  Decode JWT token and return payload
   * @param token
   * @returns  {Promise<any>}
   */
  decodeJwt(token: string) {
    return this.jwtService.verify(token);
  }
}