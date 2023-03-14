import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import {
  ApiResponse,
  InternalServerErrorResponse,
} from 'src/common/generic-response/api-response';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: ApiResponse<T>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (!exception.status) {
      exception.status = 500;
    }
    const status = exception.status;

    response
      .status(status)
      .json(new InternalServerErrorResponse(JSON.stringify(exception)));
  }
}
