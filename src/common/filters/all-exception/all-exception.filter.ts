import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

//TODO add logger service to log the error in a file or database or whatever you want to do with it
@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log(exception);
  }
}
