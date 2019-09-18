import { Context } from 'koa';
import {
  prefix,
  route,
  Method,
  swaggerInfo,
  swaggerTypes,
} from '../decorator/router';
import { BaseController } from '../common/baseController';
import { Create, Update, Query } from '../model/tag';

@prefix('/v1')
export class TagController extends BaseController {
  @route('/tags', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/tags',
    tags: ['tag'],
    summary: '获取标签列表',
    query: {
      id: { type: swaggerTypes.number, description: '标签id' },
      user_id: { type: swaggerTypes.number, description: '用户id' },
      tag: { type: swaggerTypes.string, description: '标签' },
      sort: { type: swaggerTypes.string, description: '排序' },
      pagination: { type: swaggerTypes.boolean, description: '是否分页' },
      page: { type: swaggerTypes.number, description: '页码' },
      limit: { type: swaggerTypes.number, description: '条数' },
    },
    response: {
      status: 200,
      description: '获取标签列表',
      res_type: 'array',
      schema: 'Tag',
      paginate: true,
    },
  })
  async index(ctx: Context) {
    const params = super.deserialize(Query, ctx.query);
    ctx.body = await ctx.service.tag.index(params);
  }

  @route('/tags', Method.POST)
  @swaggerInfo({
    method: 'post',
    path: '/v1/tags',
    tags: ['tag'],
    summary: '创建标签',
    requestBody: {
      body: {
        user_id: { type: swaggerTypes.number, description: '用户id' },
        tag: { type: swaggerTypes.string, description: '标签' },
        description: { type: swaggerTypes.string, description: '描述' },
      },
      required: ['user_id', 'tag'],
    },
    response: {
      status: 200,
      description: '创建标签',
      res_type: 'object',
      schema: 'Tag',
    },
  })
  async create(ctx: Context) {
    const params = super.deserialize(Create, ctx.request.body);
    await super.validate(Create, ctx.request.body);
    ctx.body = await ctx.service.tag.create(params);
  }

  @route('/tags/:id', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/tags/{id}',
    tags: ['tag'],
    summary: '获取标签详情',
    params: {
      id: { type: swaggerTypes.number, description: '标签id' },
    },
    response: {
      status: 200,
      description: '获取标签详情',
      res_type: 'object',
      schema: 'Tag',
    },
  })
  async show(ctx: Context) {
    const { params } = ctx;
    ctx.body = await ctx.service.tag.show(params);
  }

  @route('/tags/:id', Method.PUT)
  @swaggerInfo({
    method: 'put',
    path: '/v1/tags/{id}',
    tags: ['tag'],
    summary: '更新标签详情',
    params: {
      id: { type: swaggerTypes.number, description: '标签id' },
    },
    requestBody: {
      body: {
        description: { type: swaggerTypes.string, description: '描述' },
      },
    },
    response: {
      status: 200,
      description: '更新标签详情',
      res_type: 'number',
    },
  })
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.params, ctx.request.body),
    );
    await super.validate(Update, Object.assign(ctx.params, ctx.request.body));
    ctx.body = await ctx.service.tag.update(params);
  }

  @route('/tags/:id', Method.DELETE)
  @swaggerInfo({
    method: 'delete',
    path: '/v1/tags/{id}',
    tags: ['tag'],
    summary: '删除标签详情',
    params: {
      id: { type: swaggerTypes.number, description: '标签id' },
    },
    response: {
      status: 200,
      description: '删除标签详情',
      res_type: 'number',
    },
  })
  async destroy(ctx: Context) {
    const { params } = ctx;
    ctx.body = await ctx.service.tag.destroy(params);
  }
}
