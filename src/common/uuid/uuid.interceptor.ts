import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Observable } from 'rxjs';
import { GenericResponse } from '../generic-response/generic-response';

@Injectable()
export class UuidInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const uuid = request.params.id;

    if (!isUUID(uuid)) {
      throw GenericResponse.badRequest('Invalid UUID');
    }
    return next.handle();
  }
}
