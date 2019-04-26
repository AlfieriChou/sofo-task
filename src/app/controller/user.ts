import { prefix, route, Method, swaggerInfo } from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { Register, Login, Update } from '../model/user'
import { UserService } from '../service/user'

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
        username: { type: 'string', comment: '用户名' },
        password: { type: 'string', comment: '密码' }
      },
      required: ['username', 'password']
    },
    response: {
      status: 200,
      description: '登录',
      type: 'object',
      model: 'User'
    }
  })
  async login(ctx: Context) {
    const params = super.deserialize(Login, ctx.request.body)
    await super.validate(Login, ctx.request.body)
    const result = await new UserService().login(params)
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
        username: { type: 'string', comment: '用户名' },
        password: { type: 'string', comment: '密码' },
        age: { type: 'number', comment: '年龄' },
        description: { type: 'string', comment: '描述' }
      },
      required: ['username', 'password']
    },
    response: {
      status: 200,
      description: '用户注册',
      type: 'object',
      model: 'User'
    }
  })
  async register(ctx: Context) {
    const params = super.deserialize(Register, ctx.request.body)
    await super.validate(Register, ctx.request.body)
    ctx.body = await new UserService().register(params)
  }

  @route('/users/:id', Method.GET)
  @swaggerInfo({
    method: 'get',
    path: '/v1/users/{id}',
    tags: ['user'],
    summary: '获取用户详情',
    query: {
      id: { type: 'number', comment: '用户id' }
    },
    response: {
      status: 200,
      description: '获取用户详情',
      type: 'object',
      model: 'User'
    }
  })
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = await new UserService().show(params)
  }

  @route('/users/:id', Method.PUT)
  @swaggerInfo({
    method: 'put',
    path: '/v1/users/{id}',
    tags: ['user'],
    summary: '更新用户信息',
    query: {
      id: { type: 'number', comment: '用户id' }
    },
    requestBody: {
      body: {
        age: { type: 'number', comment: '年龄' },
        description: { type: 'string', comment: '描述' }
      }
    },
    response: {
      status: 200,
      description: '更新用户信息'
    }
  })
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.request.body, ctx.params)
    )
    await super.validate(Update, Object.assign(ctx.request.body, ctx.params))
    ctx.body = await new UserService().update(params)
  }

  @route('/users/:id', Method.DELETE)
  @swaggerInfo({
    method: 'delete',
    path: '/v1/users/{id}',
    tags: ['user'],
    summary: '删除用户信息',
    query: {
      id: { type: 'number', comment: '用户id' }
    },
    response: {
      status: 200,
      description: '删除用户信息'
    }
  })
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = await new UserService().destroy(params)
  }
}
