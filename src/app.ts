import express, { Application } from 'express';
import mongoose from 'mongoose';
import { MONGO_URI, MONGO_OPTIONS } from './config';
import { applyRoutes, applyMiddleware } from './utils/apply';
import middlewares from './middlewares';
import routes from './routes';
import errorHandlers from './middlewares/errorHandlers';

export default class App {
  PORT: number;
  app: Application;

  constructor(PORT: number) {
    this.PORT = PORT;
    this.app = express();
  }

  init() {
    mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    applyMiddleware(middlewares, this.app);
    applyRoutes(routes, this.app);
    applyMiddleware(errorHandlers, this.app);
    this.app.listen(this.PORT);
  }
}
