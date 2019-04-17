import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'

@prefix('/v1')
export class TagController extends BaseController {
  @route('/tags', Method.GET)
  async index(ctx: Context) {
    const params = ctx.query
    ctx.body = params
  }

  @route('/tags', Method.POST)
  async create(ctx: Context) {
    const params = ctx.request.body
    ctx.body = params
  }

  @route('/tags/:id', Method.GET)
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = params
  }

  @route('/tags/:id', Method.PUT)
  async update(ctx: Context) {
    const params = ctx.params
    ctx.body = params
  }

  @route('/tags/:id', Method.DELETE)
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = params
  }
}
