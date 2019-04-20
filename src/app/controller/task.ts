import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { Create, Update } from '../model/task'
import { TaskService } from '../service/task'

@prefix('/v1')
export class TaskController extends BaseController {
  @route('/tasks', Method.GET)
  async index(ctx: Context) {
    const params = ctx.query
    ctx.body = await new TaskService().index(params)
  }

  @route('/tasks', Method.POST)
  async create(ctx: Context) {
    const params = super.deserialize(Create, ctx.request.body)
    await super.validate(Create, params)
    ctx.body = await new TaskService().create(params)
  }

  @route('/tasks/:id', Method.GET)
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = await new TaskService().show(params)
  }

  @route('/tasks/:id', Method.PUT)
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.request.body, ctx.params)
    )
    await super.validate(Update, Object.assign(ctx.request.body, ctx.params))
    ctx.body = await new TaskService().update(params)
  }

  @route('/tasks/:id', Method.DELETE)
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = await new TaskService().destroy(params)
  }
}
