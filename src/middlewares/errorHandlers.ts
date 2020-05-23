import {
  Application,
  NextFunction,
  Response,
  Request,
  RequestHandler,
} from 'express';
import { HttpNotFound, HttpError } from '../errors/httpErrors';

const handleNotFound = (app: Application) =>
  app.use((req, res) => {
    throw new HttpNotFound('Method not found');
  });

const handleClientError = (app: Application) =>
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  });

const handleServerError = (app: Application) =>
  app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
    res.status(500).json({ message: err.message })
  );

export const catchAsync = (handler: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => handler(...args).catch(args[2]);

export default [handleNotFound, handleClientError];
