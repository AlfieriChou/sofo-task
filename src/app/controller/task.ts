import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { Create } from '../model/task'

@prefix('/v1')
export class TaskController extends BaseController {
  @route('/tasks', Method.GET)
  async index(ctx: Context) {
    const params = ctx.query
    ctx.body = params
  }

  @route('/tasks', Method.POST)
  async create(ctx: Context) {
    const params = super.deserialize(Create, ctx.request.body)
    await super.validate(Create, ctx.request.body)
    ctx.body = params
  }

  @route('/tasks/:id', Method.GET)
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = params
  }

  @route('/tasks/:id', Method.PUT)
  async update(ctx: Context) {
    const params = Object.assign(ctx.request.body, ctx.params)
    ctx.body = params
  }

  @route('/tasks/:id', Method.DELETE)
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = params
  }
}
