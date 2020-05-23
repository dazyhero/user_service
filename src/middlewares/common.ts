import { Application, urlencoded, json } from 'express';
import cors from 'cors';

export const handleCors = (app: Application) =>
  app.use(cors({ credentials: true, origin: true }));

export const handleBodyParser = (app: Application) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
};
