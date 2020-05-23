import App from './app';
import { PORT } from './config';

const main = () => {
  const app = new App(+PORT);
  app.init();
};

main();
