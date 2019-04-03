import { Config } from '../type'

export const config: Config = {
  port: 4000,
  mysql: {
    host: '140.143.194.238',
    user: 'istar',
    password: 'iStar12345@',
    database: 'test'
  },
  redis: {
    host: '140.143.194.238',
    password: 'alfieri',
    db: 1,
    port: 6389
  }
}
