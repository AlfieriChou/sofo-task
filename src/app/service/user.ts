import { BaseService } from '../common/baseService'
import { knex } from '../../database'
import * as bcrypt from 'bcrypt'
import { User } from '../model/user'
import * as jwt from 'jsonwebtoken'

interface Payload {
  sub: User
  exp: number
}

export class UserService extends BaseService {
  private createToken(user: User): string {
    let created_at: Date = new Date()
    created_at.setDate(created_at.getDate() + 30)
    let timeStamp: number = Date.parse(created_at.toString())
    let payload: Payload = {
      sub: user,
      exp: timeStamp
    }
    return jwt.sign(payload, 'sofo')
  }

  async register(params) {
    const exists = await knex('sofo_users')
      .where('username', params.username)
      .whereNull('deleted_at')
      .first()
    if (exists) this.error(400, '该用户名已存在！！')
    const password = await bcrypt.hash(params.password, 10)
    const result: User = await knex('sofo_users').insert({
      username: params.username,
      password: password,
      age: params.age || 0,
      description: params.description || ''
    })
    return result
  }

  async login(params) {
    const account = await knex('sofo_users')
      .where('username', params.username)
      .whereNull('deleted_at')
      .first()
    if (!account) this.error(404, '该账号不存在！！！')
    if (bcrypt.compare(params.password, account.password)) {
      const token = this.createToken(account)
      return {
        account: account,
        token: token
      }
    } else {
      this.error(401, '登录失败')
    }
  }
}
