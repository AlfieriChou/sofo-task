import * as Koa from 'koa';
import { Session } from 'koa-generic-session';
import * as opentracing from 'opentracing';
import { IContainer } from './extends/ioc';

export type Middleware = (ctx: Koa.Context, next?: any) => any | Promise<any>;

export interface Config {
  env?: string
  port: number
  mysql: Mysql
  redis: Redis
}

interface Mysql {
  host: string
  user: string
  password: string
  database: string
  port?: number
}

interface Redis {
  host: string
  password?: string
  db?: number
  port: number
}

declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    body: any
  }

  interface Context extends Koa.BaseContext {
    session: Session | null
    request: Request
    service: IContainer
    queries: Knex.QueryBuilder[]
    _spans: opentracing.Span[]
  }
}
