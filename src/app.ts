import 'reflect-metadata'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-generic-session'
import * as redisStrore from 'koa-redis'
import { config } from './config'
import { loadControllers } from './app/decorator/router'
import { Middleware } from './type'

const app = new Koa()

const redis = config.redis

const redisSession: Middleware = session({
  prefix: 'sess:',
  store: redisStrore({
    host: redis.host,
    port: redis.port,
    password: redis.password || '',
    db: redis.db
  }),
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    signed: true
  }
})

app.use(redisSession)
if (process.env.NODE_ENV === 'development' || 'test') {
  app.use(logger())
}

app.use(bodyParser())

const router = loadControllers()
app.use(router.routes())
app.use(router.allowedMethods())

export { app }
