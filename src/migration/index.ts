import * as Knex from 'knex'
import { join } from 'path'
import { Config } from '../type'

let env: string = process.argv[2]
if (!env) {
  env = 'default'
}

const configPath = join(__dirname, '../config', `config.${env}.ts`)
const config: Config = require(configPath).config

export const db: Knex = Knex({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    supportBigNumbers: true,
    charset: 'utf8mb4',
    connectTimeout: 15000
  }
})
