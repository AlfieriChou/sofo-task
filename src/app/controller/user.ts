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
    responses: {
      '200': {
        description: '用户登录'
      }
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
    responses: {
      '200': {
        description: '用户注销'
      }
    }
  })
  async logout(ctx: Context) {
    if (ctx.session) {
      ctx.session['user'] = null
    }
  }

  @route('/register', Method.POST)
  async register(ctx: Context) {
    const params = super.deserialize(Register, ctx.request.body)
    await super.validate(Register, ctx.request.body)
    ctx.body = await new UserService().register(params)
  }

  @route('/users/:id', Method.GET)
  async show(ctx: Context) {
    const params = ctx.params
    ctx.body = await new UserService().show(params)
  }

  @route('/users/:id', Method.PUT)
  async update(ctx: Context) {
    const params = super.deserialize(
      Update,
      Object.assign(ctx.request.body, ctx.params)
    )
    await super.validate(Update, Object.assign(ctx.request.body, ctx.params))
    ctx.body = await new UserService().update(params)
  }

  @route('/users/:id', Method.DELETE)
  async destroy(ctx: Context) {
    const params = ctx.params
    ctx.body = await new UserService().destroy(params)
  }
}
