import * as Knex from 'knex';
import { config } from '../config';

export const knex: Knex = Knex({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    supportBigNumbers: true,
    charset: 'utf8mb4',
    connectTimeout: 15000,
  },
  pool: {
    min: 2,
    max: 10,
  },
});
