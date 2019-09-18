import { Context } from 'koa';
import {
  prefix,
  route,
  Method,
  swaggerInfo,
  swaggerTypes,
} from '../decorator/router';
import { BaseController } from '../common/baseController';
import { Create, Update, Query } from '../model/task';

@prefix('/v1')
export class TaskController extends BaseController {
  @route('/tasks', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/tasks',
    tags: ['task'],
    summary: '获取task列表',
    query: {
      id: { type: swaggerTypes.number, description: 'taskid' },
      user_id: { type: swaggerTypes.number, description: '用户id' },
      tag_id: { type: swaggerTypes.number, description: '标签id' },
      sort: { type: swaggerTypes.string, description: '排序' },
      pagination: { type: swaggerTypes.boolean, description: '是否分页' },
      page: { type: swaggerTypes.number, description: '页码' },
      limit: { type: swaggerTypes.number, description: '条数' },
    },
    response: {
      status: 200,
      description: '获取task列表',
      res_type: 'array',
      schema: 'Task',
      paginate: true,
    },
  })
  async index(ctx: Context) {
    const params = super.deserialize(Query, ctx.query);
    ctx.body = await ctx.service.task.index(params);
  }

  @route('/tasks', Method.POST)
  @swaggerInfo({
    method: 'post',
    path: '/v1/tasks',
    tags: ['task'],
    summary: '创建task',
    requestBody: {
      body: {
        user_id: { type: swaggerTypes.number, description: '用户id' },
        tag_id: { type: swaggerTypes.number, description: '标签id' },
        content: { type: swaggerTypes.string, description: '内容' },
        start_at: {
          type: swaggerTypes.string,
          description: '开始时间 date-time',
        },
        end_at: { type: swaggerTypes.string, description: '结束时间 date-time' },
      },
      required: ['user_id', 'tag_id', 'content', 'start_at', 'end_at'],
    },
    response: {
      status: 200,
      description: '创建task',
      res_type: 'object',
      schema: 'Task',
    },
  })
  async create(ctx: Context) {
    const params = super.deserialize(Create, ctx.request.body);
    await super.validate(Create, params);
    ctx.body = await ctx.service.task.create(params);
  }

  @route('/tasks/:id', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/tasks/{id}',
    tags: ['task'],
    summary: '获取task详情',
    params: {
      id: { type: swaggerTypes.number, description: 'task id' },
    },
    response: {
      status: 200,
      description: '获取task详情',
      res_type: 'object',
      schema: 'Task',
    },
  })
  async show(ctx: Context) {
    const { params } = ctx;
    ctx.body = await ctx.service.task.show(params);
  }

  @route('/tasks/:id', Method.PUT)
  @swaggerInfo({
    method: 'put',
    path: '/v1/tasks/{id}',
    tags: ['task'],
    summary: '更新task详情',
    params: {
      id: { type: swaggerTypes.number, description: 'task id' },
    },
    requestBody: {
      body: {
        content: { type: swaggerTypes.string, description: '内容' },
        start_at: {
          type: swaggerTypes.string,
          description: '开始时间 date-time',
        },
        end_at: { type: swaggerTypes.string, description: '结束时间 date-time' },
      },
    },
    response: {
      status: 200,
      description: '更新task详情',
      res_type: 'number',
    },
  })
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.request.body, ctx.params),
    );
    await super.validate(Update, Object.assign(ctx.request.body, ctx.params));
    ctx.body = await ctx.service.task.update(params);
  }

  @route('/tasks/:id', Method.DELETE)
  @swaggerInfo({
    method: 'delete',
    path: '/v1/tasks/{id}',
    tags: ['task'],
    summary: '删除task详情',
    params: {
      id: { type: swaggerTypes.number, description: 'task id' },
    },
    response: {
      status: 200,
      description: '删除task详情',
      res_type: 'number',
    },
  })
  async destroy(ctx: Context) {
    const { params } = ctx;
    ctx.body = await ctx.service.task.destroy(params);
  }
}
