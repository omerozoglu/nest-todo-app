import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log('awdwadwdawd');

    response.status(response.statusCode).json({
      statusCode: response.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception,
    });
  }
}
