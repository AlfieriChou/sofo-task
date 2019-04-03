import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'

@prefix('/')
export class HelloController {
  @route('/', Method.GET)
  async index(ctx: Context) {
    ctx.body = 'Hello World'
  }
}
