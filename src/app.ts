import 'reflect-metadata'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'
import { loadControllers } from './app/decorator/router'

const app = new Koa()

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.use(bodyParser())

const router = loadControllers()
app.use(router.routes())
app.use(router.allowedMethods())

export { app }
