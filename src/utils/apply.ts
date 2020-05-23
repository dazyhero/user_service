import { Application, Router } from 'express';

type Wrapper = (app: Application) => void;

export const applyMiddleware = (middleware: Wrapper[], app: Application) =>
  middleware.forEach((f) => f(app));

export const applyRoutes = (routes: Router[], app: Application) =>
  routes.forEach((r) => app.use(r));
