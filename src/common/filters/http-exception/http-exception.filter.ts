import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApiResponse } from 'src/common/generic-response/api-response';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: ApiResponse<T>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status;

    response.status(status).json({
      message: exception.message,
      status: status,
    });
  }
}
