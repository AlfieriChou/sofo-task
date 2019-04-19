import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { Create, Update, Query } from '../model/tag'
import { TagService } from '../service/tag'

@prefix('/v1')
export class TagController extends BaseController {
  @route('/tags', Method.GET)
  async index(ctx: Context) {
    const params = super.deserialize(Query, ctx.query)
    ctx.body = await new TagService().index(params)
  }

  @route('/tags', Method.POST)
  async create(ctx: Context) {
    const params = super.deserialize(Create, ctx.request.body)
    await super.validate(Create, ctx.request.body)
    ctx.body = await new TagService().create(params)
  }

  @route('/tags/:id', Method.GET)
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = await new TagService().show(params)
  }

  @route('/tags/:id', Method.PUT)
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.params, ctx.request.body)
    )
    await super.validate(Update, Object.assign(ctx.params, ctx.request.body))
    ctx.body = await new TagService().update(params)
  }

  @route('/tags/:id', Method.DELETE)
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = await new TagService().destroy(params)
  }
}
