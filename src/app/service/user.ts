import { BaseService } from '../common/baseService'
import { knex } from '../../database'
import * as bcrypt from 'bcrypt'
import { User } from '../model/user'

export class UserService extends BaseService {
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
}
