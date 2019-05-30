import 'reflect-metadata'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-generic-session'
import * as redisStrore from 'koa-redis'
import * as jwt from 'koa-jwt'
import * as path from 'path'
import * as views from 'koa-views'
import { config } from './config'
import { loadControllers } from './app/decorator/router'
import { Middleware } from './type'
import { JWTMiddleware } from './middleware/JWTtoken'
import { requestLog } from './middleware/requestLog'
import { container } from './extends/ioc'
import { knexLogger } from './middleware/knexLogger'
import { knex } from './database'
import { responseLog } from './middleware/responseLog'

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

const cors: Middleware = async (ctx, next) => {
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Max-Age', '86400000')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  ctx.set(
    'Access-Control-Allow-Headers',
    'x-requested-with, accept, origin, content-type'
  )
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      code: ctx.status,
      message: err.message,
      stack: err.stack
    }
  }
}

app.context.service = container

app.keys = ['sofo', 'task']
app.use(redisSession)
app.use(JWTMiddleware())
app.use(cors)
app.use(
  jwt({
    secret: 'sofo'
  }).unless({
    path: [/\/register/, /\/login/, /\//, /\/swagger.json/, /\/apidoc/]
  })
)
app.use(
  views(path.resolve(__dirname, './views'), { map: { html: 'nunjucks' } })
)
if (process.env.NODE_ENV === 'development' || 'test') {
  app.use(logger())
}

app.use(bodyParser())
app.use(requestLog())
app.use(knexLogger(knex))
app.use(responseLog())
const router = loadControllers()
app.use(router.routes())
app.use(router.allowedMethods())

export { app }
