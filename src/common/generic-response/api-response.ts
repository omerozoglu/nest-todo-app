import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  data: T;
  message: string;
  status: number;

  constructor(data: T, message: string, status: number) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export class SuccessResponse<T> extends ApiResponse<T> {
  constructor(data: T, message = 'Success') {
    super(data, message, HttpStatus.OK);
  }
}

export class CreatedResponse<T> extends ApiResponse<T> {
  constructor(data: T, message = 'Created') {
    super(data, message, HttpStatus.CREATED);
  }
}

export class NoContentResponse<T> extends ApiResponse<T> {
  constructor(message = 'No Content') {
    super(null, message, HttpStatus.NO_CONTENT);
  }
}

export class BadRequestResponse<T> extends ApiResponse<T> {
  constructor(message = 'Bad Request') {
    super(null, message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundResponse<T> extends ApiResponse<T> {
  constructor(message = 'Not Found') {
    super(null, message, HttpStatus.NOT_FOUND);
  }
}

export class NotAcceptableResponse<T> extends ApiResponse<T> {
  constructor(message = 'Not Acceptable') {
    super(null, message, HttpStatus.NOT_ACCEPTABLE);
  }
}

export class UnauthorizedResponse<T> extends ApiResponse<T> {
  constructor(message = 'Unauthorized') {
    super(null, message, HttpStatus.UNAUTHORIZED);
  }
}

export class InternalServerErrorResponse<T> extends ApiResponse<T> {
  constructor(message = 'Internal Server Error') {
    super(null, message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
