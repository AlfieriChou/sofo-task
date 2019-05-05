import {
  prefix,
  route,
  Method,
  swaggerInfo,
  swaggerTypes,
  swaggerFormats
} from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { Register, Login, Update } from '../model/user'

@prefix('/v1')
export class UserController extends BaseController {
  @route('/login', Method.POST)
  @swaggerInfo({
    method: 'post',
    path: '/v1/login',
    tags: ['user'],
    summary: '用户登录',
    requestBody: {
      body: {
        username: { type: swaggerTypes.string, description: '用户名' },
        password: {
          type: swaggerTypes.string,
          format: swaggerFormats.password,
          description: '密码'
        }
      },
      required: ['username', 'password']
    },
    response: {
      status: 200,
      description: '登录',
      res_type: 'object',
      schema: 'User'
    }
  })
  async login(ctx: Context) {
    const params = super.deserialize(Login, ctx.request.body)
    await super.validate(Login, ctx.request.body)
    const result = await ctx.service.user.login(params)
    if (ctx.session) {
      ctx.session['user'] = result
    }
    ctx.body = result
  }

  @route('/logout', Method.DELETE)
  @swaggerInfo({
    method: 'delete',
    path: '/v1/logout',
    tags: ['user'],
    summary: '用户注销',
    response: {
      status: 200,
      description: '用户注销'
    }
  })
  async logout(ctx: Context) {
    if (ctx.session) {
      ctx.session['user'] = null
    }
  }

  @route('/register', Method.POST)
  @swaggerInfo({
    method: 'post',
    path: '/v1/register',
    tags: ['user'],
    summary: '用户注册',
    requestBody: {
      body: {
        username: { type: swaggerTypes.string, description: '用户名' },
        password: {
          type: swaggerTypes.string,
          format: swaggerFormats.password,
          description: '密码'
        },
        age: { type: swaggerTypes.number, description: '年龄' },
        description: { type: swaggerTypes.string, description: '描述' }
      },
      required: ['username', 'password']
    },
    response: {
      status: 200,
      description: '用户注册',
      res_type: 'object',
      schema: 'User'
    }
  })
  async register(ctx: Context) {
    const params = super.deserialize(Register, ctx.request.body)
    await super.validate(Register, ctx.request.body)
    ctx.body = await ctx.service.user.register(params)
  }

  @route('/users/:id', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/users/{id}',
    tags: ['user'],
    summary: '获取用户详情',
    params: {
      id: { type: swaggerTypes.number, description: '用户id' }
    },
    response: {
      status: 200,
      description: '获取用户详情',
      res_type: 'object',
      schema: 'User'
    }
  })
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = await ctx.service.user.show(params)
  }

  @route('/users/:id', Method.PUT)
  @swaggerInfo({
    method: 'put',
    path: '/v1/users/{id}',
    tags: ['user'],
    summary: '更新用户信息',
    params: {
      id: { type: swaggerTypes.number, description: '用户id' }
    },
    requestBody: {
      body: {
        age: { type: swaggerTypes.number, description: '年龄' },
        description: { type: swaggerTypes.string, description: '描述' }
      }
    },
    response: {
      status: 200,
      description: '更新用户信息',
      res_type: 'number'
    }
  })
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.request.body, ctx.params)
    )
    await super.validate(Update, Object.assign(ctx.request.body, ctx.params))
    ctx.body = await ctx.service.user.update(params)
  }

  @route('/users/:id', Method.DELETE)
  @swaggerInfo({
    method: 'delete',
    path: '/v1/users/{id}',
    tags: ['user'],
    summary: '删除用户信息',
    params: {
      id: { type: swaggerTypes.number, description: '用户id' }
    },
    response: {
      status: 200,
      description: '删除用户信息',
      res_type: 'number'
    }
  })
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = await ctx.service.user.destroy(params)
  }
}
