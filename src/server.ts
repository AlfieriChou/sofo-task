import { schedule } from '@trapts/schedule';
import { resolve } from 'path';
import { app } from './app';
import { knex } from './database';
import { config } from './config';

const bootstrap = () => {
  schedule(resolve(__dirname, './schedule'));

  setInterval(() => {
    Promise.resolve(knex.raw('select 1'));
  }, 10 * 60000);

  app.listen(config.port, () => {
    console.info(`Application is listening port: ${config.port}`);
  });
};

bootstrap();
