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
  static success<T>(data: T, message = 'success', status = 200) {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static created<T>(data: T, message = 'created', status = 201) {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static noContent<T>(data: T, message = 'no content', status = 204) {
    return new GenericResponse(data, message, status);
  }

  /**
   *
   * @param data
   * @param message
   * @param status
   * @returns {GenericResponse<T>}
   */
  static notFound<T>(data: T, message = 'not found', status = 404) {
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
  ) {
    return new GenericResponse(data, message, status);
  }
}
