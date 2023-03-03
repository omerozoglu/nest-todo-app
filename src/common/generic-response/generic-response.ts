export class GenericResponse<T> {
  data: T;
  message: string;
  status: number;

  /**
   *
   * @param data
   * @param message
   * @param status
   */
  constructor(data: T, message: string, status: number) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static success<T>(
    data: T,
    message = 'success',
    status = 200
  ): GenericResponse<T> {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static created<T>(
    data: T,
    message = 'created',
    status = 201
  ): GenericResponse<T> {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static noContent<T>(
    data: T,
    message = 'no content',
    status = 204
  ): GenericResponse<T> {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static badRequest<T>(
    data: T,
    message = 'bad request',
    status = 400
  ): GenericResponse<T> {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static notFound<T>(
    data: T,
    message = 'not found',
    status = 404
  ): GenericResponse<T> {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static notAcceptable<T>(
    data: T,
    message = 'not acceptable',
    status = 406
  ): GenericResponse<T> {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static internalServerError<T>(
    data: T,
    message = 'internal server error',
    status = 500
  ): GenericResponse<T> {
    return new GenericResponse(data, message, status);
  }
}
