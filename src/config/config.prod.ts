import { Config } from '../type'

export const config: Config = {
  port: 3000,
  mysql: {
    host: '140.143.194.238',
    user: 'istar',
    password: 'iStar12345@',
    database: 'sofo'
  },
  redis: {
    host: '140.143.194.238',
    password: 'alfieri',
    db: 2,
    port: 6389
  }
}
