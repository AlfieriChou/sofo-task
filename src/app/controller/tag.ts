import { prefix, route, Method, swaggerInfo } from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { Create, Update, Query } from '../model/tag'
import { TagService } from '../service/tag'

@prefix('/v1')
export class TagController extends BaseController {
  @route('/tags', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/tags',
    tags: ['tag'],
    summary: '获取标签列表',
    query: {
      id: { type: 'number', comment: '标签id' },
      user_id: { type: 'number', comment: '用户id' },
      tag: { type: 'string', comment: '标签' },
      sort: { type: 'string', comment: '排序' },
      pagination: { type: 'boolean', comment: '是否分页' },
      page: { type: 'number', comment: '页码' },
      limit: { type: 'number', comment: '条数' }
    },
    response: {
      status: 200,
      description: '获取标签列表'
    }
  })
  async index(ctx: Context) {
    const params = super.deserialize(Query, ctx.query)
    ctx.body = await new TagService().index(params)
  }

  @route('/tags', Method.POST)
  @swaggerInfo({
    method: 'post',
    path: '/v1/tags',
    tags: ['tag'],
    summary: '创建标签',
    requestBody: {
      body: {
        user_id: { type: 'number', comment: '用户id' },
        tag: { type: 'string', comment: '标签' },
        description: { type: 'string', comment: '描述' }
      },
      required: ['user_id', 'tag']
    },
    response: {
      status: 200,
      description: '创建标签',
      type: 'object',
      model: 'Tag'
    }
  })
  async create(ctx: Context) {
    const params = super.deserialize(Create, ctx.request.body)
    await super.validate(Create, ctx.request.body)
    ctx.body = await new TagService().create(params)
  }

  @route('/tags/:id', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/tags/{id}',
    tags: ['tag'],
    summary: '获取标签详情',
    query: {
      id: { type: 'number', comment: '标签id' }
    },
    response: {
      status: 200,
      description: '获取标签详情',
      type: 'object',
      model: 'Tag'
    }
  })
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = await new TagService().show(params)
  }

  @route('/tags/:id', Method.PUT)
  @swaggerInfo({
    method: 'put',
    path: '/v1/tags/{id}',
    tags: ['tag'],
    summary: '更新标签详情',
    query: {
      id: { type: 'number', comment: '标签id' }
    },
    requestBody: {
      body: {
        description: { type: 'string', comment: '描述' }
      }
    },
    response: {
      status: 200,
      description: '更新标签详情'
    }
  })
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.params, ctx.request.body)
    )
    await super.validate(Update, Object.assign(ctx.params, ctx.request.body))
    ctx.body = await new TagService().update(params)
  }

  @route('/tags/:id', Method.DELETE)
  @swaggerInfo({
    method: 'delete',
    path: '/v1/tags/{id}',
    tags: ['tag'],
    summary: '删除标签详情',
    query: {
      id: { type: 'number', comment: '标签id' }
    },
    response: {
      status: 200,
      description: '删除标签详情'
    }
  })
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = await new TagService().destroy(params)
  }
}
