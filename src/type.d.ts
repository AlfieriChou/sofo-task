export type Middleware = (ctx: Koa.Context, next?: any) => any | Promise<any>

export interface Config {
  env?: string
  port: number
  mysql: Mysql
}

interface Mysql {
  host: string
  user: string
  password: string
  database: string
  port?: number
}
