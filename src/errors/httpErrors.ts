import { HTTPStatus } from '../enums/statusCodes';

type ConstructorProps = {
  message: string;
  status: number;
  name: string;
};

export class HttpError extends Error {
  status: number;
  name: string;

  constructor({ message, status, name }: ConstructorProps) {
    super(message);
    this.status = status;
    this.name = name;
    Error.captureStackTrace(this, HttpError);
  }
}

export class HttpNotFound extends HttpError {
  constructor(message = 'Not found') {
    super({
      message,
      status: HTTPStatus.NOT_FOUND,
      name: 'HttpNotFound',
    });
  }
}

export class HttpBadRequest extends HttpError {
  constructor(message = 'Bad request') {
    super({ message, status: HTTPStatus.BAD_REQUEST, name: 'HttpBadRequest' });
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(message = 'Internal server error') {
    super({
      message,
      status: HTTPStatus.INTERNAL_SERVER_ERROR,
      name: 'HttpInternalServerError',
    });
  }
}
