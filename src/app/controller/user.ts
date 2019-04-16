import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { Register, Login } from '../model/user'
import { UserService } from '../service/user'

@prefix('/v1')
export class UserController extends BaseController {
  @route('/login', Method.POST)
  async login(ctx: Context) {
    const params = super.deserialize(Login, ctx.request.body)
    await super.validate(Login, ctx.request.body)
    ctx.body = params
  }

  @route('/register', Method.POST)
  async register(ctx: Context) {
    const params = super.deserialize(Register, ctx.request.body)
    await super.validate(Register, ctx.request.body)
    ctx.body = await new UserService().register(params)
  }
}
