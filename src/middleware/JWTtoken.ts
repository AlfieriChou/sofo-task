import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { JWTPath } from './JWTpath'
import { Context } from 'koa'
import { ApiErrorException } from '../app/common/exception'

const secret: string = 'sofo'
const verify = promisify(jwt.verify)

export const JWTMiddleware = () => {
  return async (ctx: Context, next) => {
    if (JWTPath.includes(ctx.request.url)) {
      await next()
      return false
    }

    try {
      const token = ctx.header.authorization
      if (!token) throw new ApiErrorException('token不存在', 400)
      let payload
      try {
        payload = await verify(token.split(' ')[1], secret)
        ctx.user = {
          username: payload.username,
          age: payload.age,
          id: payload.id
        }
      } catch (err) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          message: 'Token身份无效!'
        }
      }
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          err
        }
      } else {
        ctx.status = 500
        ctx.body = {
          code: 500,
          err
        }
      }
    }
  }
}