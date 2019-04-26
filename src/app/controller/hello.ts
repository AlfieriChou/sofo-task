import { prefix, route, Method, swaggerInfo } from '../decorator/router'
import { Context } from 'koa'

@prefix('/')
export class HelloController {
  @route('/', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/',
    tags: ['index'],
    summary: 'ping api heath',
    response: {
      status: 200,
      description: 'ping api heath'
    }
  })
  async index(ctx: Context) {
    ctx.body = 'Hello sofo task!!!'
  }
}
