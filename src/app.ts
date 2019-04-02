import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'

const app = new Koa()

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.use(bodyParser())

export { app }
